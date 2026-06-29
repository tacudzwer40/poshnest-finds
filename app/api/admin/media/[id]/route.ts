import { NextResponse } from 'next/server';
import { deleteMedia } from '@/lib/media';

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const id = Number(params.id);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ error: 'Invalid id.' }, { status: 400 });
  }

  try {
    const ok = await deleteMedia(id);
    if (!ok) {
      return NextResponse.json({ error: 'Media not found.' }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to delete media.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
