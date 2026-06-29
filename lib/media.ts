import 'server-only';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { ensureDb, sql } from './db';

export type Media = {
  id: number;
  filename: string;
  original_name: string;
  url: string;
  mime_type: string;
  size_bytes: number;
  width: number | null;
  height: number | null;
  alt: string;
  created_at: string;
};

export const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');
export const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
export const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
]);
export const ALLOWED_EXT = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']);

async function ensureUploadsDir(): Promise<void> {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
}

function extFromMime(mime: string): string {
  switch (mime) {
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/webp':
      return 'webp';
    case 'image/gif':
      return 'gif';
    case 'image/avif':
      return 'avif';
    default:
      return 'bin';
  }
}

export async function saveUpload(file: File): Promise<Media> {
  await ensureDb();
  if (!ALLOWED_MIME.has(file.type)) {
    throw new Error(`Unsupported file type: ${file.type}`);
  }
  if (file.size > MAX_BYTES) {
    throw new Error('File too large (max 10 MB).');
  }
  await ensureUploadsDir();

  const ext = extFromMime(file.type);
  const filename = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}.${ext}`;
  const filepath = path.join(UPLOADS_DIR, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filepath, buffer);

  const url = `/uploads/${filename}`;

  // Optional: read image dimensions for the media library preview
  let width: number | null = null;
  let height: number | null = null;
  try {
    const dims = readImageDimensions(buffer, ext);
    if (dims) {
      width = dims.width;
      height = dims.height;
    }
  } catch {
    // non-fatal
  }

  const rows = (await sql`
    INSERT INTO media
      (filename, original_name, url, mime_type, size_bytes, width, height, alt)
    VALUES
      (${filename}, ${file.name}, ${url}, ${file.type},
       ${file.size}, ${width}, ${height}, ${''})
    RETURNING id, filename, original_name, url, mime_type, size_bytes,
              width, height, alt, created_at
  `) as unknown as Media[];
  return rows[0];
}

export async function listMedia(): Promise<Media[]> {
  await ensureDb();
  const rows = (await sql`
    SELECT id, filename, original_name, url, mime_type, size_bytes,
           width, height, alt, created_at
    FROM media
    ORDER BY id DESC
  `) as unknown as Media[];
  return rows;
}

export async function getMediaById(id: number): Promise<Media | null> {
  await ensureDb();
  const rows = (await sql`
    SELECT id, filename, original_name, url, mime_type, size_bytes,
           width, height, alt, created_at
    FROM media WHERE id = ${id} LIMIT 1
  `) as unknown as Media[];
  return rows[0] ?? null;
}

export async function deleteMedia(id: number): Promise<boolean> {
  await ensureDb();
  const m = await getMediaById(id);
  if (!m) return false;
  // Best-effort: remove the file. Don't fail the request if it doesn't exist.
  try {
    await fs.unlink(path.join(UPLOADS_DIR, m.filename));
  } catch {
    // ignore
  }
  await sql`DELETE FROM media WHERE id = ${id}`;
  return true;
}

/**
 * Minimal image-dimension reader for the common formats.
 * Returns null for anything we can't parse.
 */
function readImageDimensions(
  buf: Buffer,
  ext: string,
): { width: number; height: number } | null {
  if (ext === 'jpg' || ext === 'jpeg') {
    // Walk JPEG markers to find SOF
    let i = 2; // skip 0xFFD8
    while (i < buf.length) {
      if (buf[i] !== 0xff) return null;
      const marker = buf[i + 1];
      const size = (buf[i + 2] << 8) | buf[i + 3];
      if (
        marker === 0xc0 ||
        marker === 0xc1 ||
        marker === 0xc2 ||
        marker === 0xc3 ||
        marker === 0xc5 ||
        marker === 0xc6 ||
        marker === 0xc7 ||
        marker === 0xc9 ||
        marker === 0xca ||
        marker === 0xcb ||
        marker === 0xcd ||
        marker === 0xce ||
        marker === 0xcf
      ) {
        const h = (buf[i + 5] << 8) | buf[i + 6];
        const w = (buf[i + 7] << 8) | buf[i + 8];
        return { width: w, height: h };
      }
      i += 2 + size;
    }
    return null;
  }
  if (ext === 'png') {
    if (buf.length < 24) return null;
    const w = buf.readUInt32BE(16);
    const h = buf.readUInt32BE(20);
    return { width: w, height: h };
  }
  if (ext === 'gif') {
    if (buf.length < 10) return null;
    const w = buf.readUInt16LE(6);
    const h = buf.readUInt16LE(8);
    return { width: w, height: h };
  }
  if (ext === 'webp') {
    // "VP8L" → 0x2f: width-1 and height-1 as 14-bit LE values
    if (buf.length < 30) return null;
    if (buf.toString('ascii', 12, 16) === 'VP8L') {
      const b0 = buf[21];
      const b1 = buf[22];
      const b2 = buf[23];
      const b3 = buf[24];
      const width = 1 + (((b1 & 0x3f) << 8) | b0);
      const height = 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
      return { width, height };
    }
    if (buf.toString('ascii', 12, 16) === 'VP8 ') {
      const w = buf.readUInt16LE(26) & 0x3fff;
      const h = buf.readUInt16LE(28) & 0x3fff;
      return { width: w, height: h };
    }
    return null;
  }
  if (ext === 'avif') {
    // Parse the ISOBMFF ftyp/moov for the ispe (image spatial extents) box.
    // Minimal: walk top-level boxes, recurse one level.
    let i = 0;
    while (i + 8 < buf.length) {
      const size = buf.readUInt32BE(i);
      const type = buf.toString('ascii', i + 4, i + 8);
      const boxEnd = size > 0 ? i + size : buf.length;
      if (type === 'meta' || type === 'iprp' || type === 'ipco') {
        // walk children
        let j = i + (type === 'meta' ? 12 : 8);
        while (j + 8 < boxEnd) {
          const csize = buf.readUInt32BE(j);
          const ctype = buf.toString('ascii', j + 4, j + 8);
          if (ctype === 'ispe' && j + 20 < boxEnd) {
            const w = buf.readUInt32BE(j + 12);
            const h = buf.readUInt32BE(j + 16);
            return { width: w, height: h };
          }
          if (csize < 8) break;
          j += csize;
        }
      }
      if (size < 8) break;
      i = boxEnd;
    }
    return null;
  }
  return null;
}
