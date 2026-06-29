import { listMedia } from '@/lib/media';
import { MediaUploader } from '@/components/admin/MediaUploader';
import type { MediaItem } from '@/types/admin';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin · Media',
  robots: { index: false, follow: false },
};

export default async function AdminMediaPage() {
  const media = await listMedia();
  // Trim to the wire shape the client component expects.
  const items: MediaItem[] = media.map((m) => ({
    id: m.id,
    filename: m.filename,
    original_name: m.original_name,
    url: m.url,
    mime_type: m.mime_type,
    size_bytes: m.size_bytes,
    width: m.width,
    height: m.height,
    alt: m.alt,
    created_at: m.created_at,
  }));

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.25em] text-terracotta">Library</p>
        <h1 className="mt-2 font-serif text-3xl text-espresso">Media</h1>
        <p className="mt-1 text-sm text-espresso-soft">
          Upload images for use in product cards, post covers, and marketing materials.
        </p>
      </header>
      <MediaUploader initial={items} />
    </div>
  );
}