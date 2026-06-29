import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createPost, getAllPostsAdmin, slugify } from '@/lib/posts';

export async function GET() {
  try {
    const posts = await getAllPostsAdmin();
    return NextResponse.json(posts);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load posts.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

const Body = z.object({
  slug: z.string().min(1).max(80).optional(),
  title: z.string().min(1).max(200),
  description: z.string().max(500).default(''),
  body: z.string().max(200_000).default(''),
  cover_url: z.string().max(1000).default(''),
  tags: z.array(z.string().min(1).max(40)).max(20).default([]),
  is_published: z.boolean().default(true),
  published_at: z.string().datetime().optional(),
});

export async function POST(req: Request) {
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

  // Server-side slugify if missing
  const slug = parsed.data.slug?.trim() || slugify(parsed.data.title);

  try {
    const post = await createPost({ ...parsed.data, slug });
    return NextResponse.json({ ok: true, post });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create post.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
