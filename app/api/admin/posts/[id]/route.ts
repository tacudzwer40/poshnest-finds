import { NextResponse } from 'next/server';
import { z } from 'zod';
import { updatePost, deletePost, slugify } from '@/lib/posts';

const Body = z
  .object({
    slug: z.string().min(1).max(80).optional(),
    title: z.string().min(1).max(200).optional(),
    description: z.string().max(500).optional(),
    body: z.string().max(200_000).optional(),
    cover_url: z.string().max(1000).optional(),
    tags: z.array(z.string().min(1).max(40)).max(20).optional(),
    is_published: z.boolean().optional(),
    published_at: z.string().datetime().optional(),
  })
  .strict();

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const id = Number(params.id);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ error: 'Invalid id.' }, { status: 400 });
  }

  let parsed;
  try {
    const body = await req.json();
    parsed = Body.safeParse(body);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input.' }, { status: 400 });
  }
  if (Object.keys(parsed.data).length === 0) {
    return NextResponse.json({ error: 'No fields to update.' }, { status: 400 });
  }

  // If slug is empty after partial update and title was updated, regenerate.
  const next: Record<string, unknown> = { ...parsed.data };
  if (
    typeof next.slug === 'string' &&
    next.slug.trim() === '' &&
    typeof next.title === 'string'
  ) {
    next.slug = slugify(next.title);
  }

  try {
    const post = await updatePost(id, next);
    if (!post) {
      return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, post });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update post.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const id = Number(params.id);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ error: 'Invalid id.' }, { status: 400 });
  }

  try {
    const ok = await deletePost(id);
    if (!ok) {
      return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to delete post.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
