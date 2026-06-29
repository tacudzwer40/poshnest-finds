import { NextResponse } from 'next/server';
import { listMedia, saveUpload, ALLOWED_MIME, MAX_BYTES } from '@/lib/media';

export async function GET() {
  try {
    const media = await listMedia();
    return NextResponse.json(media);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load media.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Expected multipart/form-data.' }, { status: 400 });
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
  }

  // Defence-in-depth: validate mime and size on the route boundary too.
  // (lib/media.ts also throws, but we want a clear 400 not 500 here.)
  if (!ALLOWED_MIME.has(file.type)) {
    return NextResponse.json(
      { error: `Unsupported file type: ${file.type || 'unknown'}` },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `File too large (max ${Math.round(MAX_BYTES / (1024 * 1024))} MB).` },
      { status: 400 },
    );
  }
  if (file.size === 0) {
    return NextResponse.json({ error: 'Empty file.' }, { status: 400 });
  }

  try {
    const media = await saveUpload(file);
    return NextResponse.json({ ok: true, media });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to upload file.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
