import fs from 'node:fs/promises';
import path from 'node:path';

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  tags?: string[];
  cover?: string;
};

export type PostSummary = PostFrontmatter & {
  slug: string;
};

export type Post = PostSummary & {
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function parseFrontmatter(raw: string): { data: PostFrontmatter; content: string } {
  // Tiny frontmatter parser: accepts key: value lines between --- fences.
  // We avoid pulling in `gray-matter` to keep deps light.
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) {
    return { data: { title: '', description: '', date: '' }, content: raw };
  }
  const [, fm, body] = match;
  const data: Record<string, string | string[]> = {};
  for (const line of fm.split('\n')) {
    const m = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (!m) continue;
    const [, key, rawVal] = m;
    const val = rawVal.trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      data[key] = val
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else {
      data[key] = val.replace(/^["']|["']$/g, '');
    }
  }
  return {
    data: {
      title: String(data.title ?? ''),
      description: String(data.description ?? ''),
      date: String(data.date ?? ''),
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : undefined,
      cover: data.cover ? String(data.cover) : undefined,
    },
    content: body.trim(),
  };
}

export async function getAllPosts(): Promise<PostSummary[]> {
  let files: string[];
  try {
    files = await fs.readdir(BLOG_DIR);
  } catch {
    return [];
  }
  const mdxFiles = files.filter((f) => f.endsWith('.mdx'));
  const posts: PostSummary[] = [];
  for (const file of mdxFiles) {
    const slug = file.replace(/\.mdx$/, '');
    const raw = await fs.readFile(path.join(BLOG_DIR, file), 'utf8');
    const { data } = parseFrontmatter(raw);
    posts.push({ slug, ...data });
  }
  // Newest first
  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return posts;
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const raw = await fs.readFile(path.join(BLOG_DIR, `${slug}.mdx`), 'utf8');
    const { data, content } = parseFrontmatter(raw);
    return { slug, ...data, content };
  } catch {
    return null;
  }
}
