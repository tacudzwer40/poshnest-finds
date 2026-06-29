import 'server-only';
import { ensureDb, sql } from './db';

export type Post = {
  id: number;
  slug: string;
  title: string;
  description: string;
  body: string;
  cover_url: string;
  tags: string[];
  is_published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
};

export type PostSummary = Pick<
  Post,
  'id' | 'slug' | 'title' | 'description' | 'tags' | 'cover_url' | 'published_at'
>;

export async function getPublishedPosts(): Promise<PostSummary[]> {
  await ensureDb();
  const rows = (await sql`
    SELECT id, slug, title, description, cover_url, tags, published_at
    FROM posts
    WHERE is_published = TRUE
    ORDER BY published_at DESC, id DESC
  `) as unknown as PostSummary[];
  return rows;
}

export async function getAllPostsAdmin(): Promise<PostSummary[]> {
  await ensureDb();
  const rows = (await sql`
    SELECT id, slug, title, description, cover_url, tags, published_at
    FROM posts
    ORDER BY published_at DESC, id DESC
  `) as unknown as PostSummary[];
  return rows;
}

export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  await ensureDb();
  const rows = (await sql`
    SELECT id, slug, title, description, body, cover_url, tags,
           is_published, published_at, created_at, updated_at
    FROM posts
    WHERE slug = ${slug} AND is_published = TRUE
    LIMIT 1
  `) as unknown as Post[];
  return rows[0] ?? null;
}

export async function getPostById(id: number): Promise<Post | null> {
  await ensureDb();
  const rows = (await sql`
    SELECT id, slug, title, description, body, cover_url, tags,
           is_published, published_at, created_at, updated_at
    FROM posts
    WHERE id = ${id} LIMIT 1
  `) as unknown as Post[];
  return rows[0] ?? null;
}

export async function getPostBySlugAnyStatus(slug: string): Promise<Post | null> {
  await ensureDb();
  const rows = (await sql`
    SELECT id, slug, title, description, body, cover_url, tags,
           is_published, published_at, created_at, updated_at
    FROM posts
    WHERE slug = ${slug} LIMIT 1
  `) as unknown as Post[];
  return rows[0] ?? null;
}

export async function getRelatedPosts(limit = 3): Promise<PostSummary[]> {
  await ensureDb();
  const rows = (await sql`
    SELECT id, slug, title, description, cover_url, tags, published_at
    FROM posts
    WHERE is_published = TRUE
    ORDER BY published_at DESC, id DESC
    LIMIT ${limit}
  `) as unknown as PostSummary[];
  return rows;
}

export type PostInput = {
  slug: string;
  title: string;
  description: string;
  body: string;
  cover_url: string;
  tags: string[];
  is_published: boolean;
  published_at?: string;
};

export async function createPost(input: PostInput): Promise<Post> {
  await ensureDb();
  const publishedAt = input.published_at ?? new Date().toISOString();
  const rows = (await sql`
    INSERT INTO posts
      (slug, title, description, body, cover_url, tags, is_published, published_at)
    VALUES
      (${input.slug}, ${input.title}, ${input.description}, ${input.body},
       ${input.cover_url}, ${input.tags}::text[], ${input.is_published}, ${publishedAt})
    RETURNING id, slug, title, description, body, cover_url, tags,
              is_published, published_at, created_at, updated_at
  `) as unknown as Post[];
  return rows[0];
}

export async function updatePost(id: number, input: Partial<PostInput>): Promise<Post | null> {
  await ensureDb();
  const existing = await getPostById(id);
  if (!existing) return null;
  const next = { ...existing, ...input };
  const rows = (await sql`
    UPDATE posts SET
      slug          = ${next.slug},
      title         = ${next.title},
      description   = ${next.description},
      body          = ${next.body},
      cover_url     = ${next.cover_url},
      tags          = ${next.tags}::text[],
      is_published  = ${next.is_published},
      published_at  = ${next.published_at},
      updated_at    = NOW()
    WHERE id = ${id}
    RETURNING id, slug, title, description, body, cover_url, tags,
              is_published, published_at, created_at, updated_at
  `) as unknown as Post[];
  return rows[0] ?? null;
}

export async function deletePost(id: number): Promise<boolean> {
  await ensureDb();
  const rows = (await sql`DELETE FROM posts WHERE id = ${id} RETURNING id`) as unknown as Array<{
    id: number;
  }>;
  return rows.length > 0;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}
