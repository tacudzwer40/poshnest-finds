'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PostBodyPreview } from './PostBodyPreview';
import type { PostInput } from '@/types/admin';

type Mode = { kind: 'create' } | { kind: 'edit'; id: number };

const EMPTY: PostInput = {
  slug: '',
  title: '',
  description: '',
  body: '',
  cover_url: '',
  tags: [],
  is_published: true,
};

function slugifyClient(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export function PostForm({
  mode,
  initial,
}: {
  mode: Mode;
  initial?: PostInput;
}) {
  const [form, setForm] = useState<PostInput>(initial ?? EMPTY);
  const [tagsRaw, setTagsRaw] = useState((initial?.tags ?? []).join(', '));
  const [slugTouched, setSlugTouched] = useState(mode.kind === 'edit');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isEdit = mode.kind === 'edit';
  const editId = mode.kind === 'edit' ? mode.id : null;

  function update<K extends keyof PostInput>(key: K, value: PostInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onTitleChange(value: string) {
    update('title', value);
    if (!slugTouched) {
      update('slug', slugifyClient(value));
    }
  }

  function onSlugChange(value: string) {
    setSlugTouched(true);
    update('slug', slugifyClient(value));
  }

  function onTagsChange(value: string) {
    setTagsRaw(value);
    const tags = value
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    update('tags', tags);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const url = isEdit ? `/api/admin/posts/${editId}` : '/api/admin/posts';
      const method = isEdit ? 'PATCH' : 'POST';
      const payload = { ...form, tags: tagsRaw
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0) };
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? `Failed to ${isEdit ? 'update' : 'create'} post.`);
        setSubmitting(false);
        return;
      }
      window.location.href = '/admin/posts';
    } catch {
      setError('Network error. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {error && (
        <p
          role="alert"
          className="rounded-md bg-terracotta/10 border border-terracotta/30 px-3 py-2 text-sm text-terracotta-dark"
        >
          {error}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-[1fr_220px]">
        <div>
          <label htmlFor="title" className="admin-label">Title</label>
          <input
            id="title"
            type="text"
            required
            value={form.title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="admin-input"
            placeholder="5 Ways to Style a Reading Nook"
            maxLength={200}
          />
        </div>
        <div>
          <label htmlFor="slug" className="admin-label">Slug</label>
          <input
            id="slug"
            type="text"
            value={form.slug}
            onChange={(e) => onSlugChange(e.target.value)}
            className="admin-input font-mono text-xs"
            placeholder="auto-from-title"
            maxLength={80}
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="admin-label">Description</label>
        <input
          id="description"
          type="text"
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          className="admin-input"
          placeholder="A 1-2 sentence summary used for SEO and the index card."
          maxLength={500}
        />
      </div>

      <div>
        <label htmlFor="cover_url" className="admin-label">Cover image URL</label>
        <input
          id="cover_url"
          type="url"
          value={form.cover_url}
          onChange={(e) => update('cover_url', e.target.value)}
          className="admin-input"
          placeholder="https://m.media-amazon.com/images/..."
          maxLength={1000}
        />
        {form.cover_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={form.cover_url}
            alt=""
            className="mt-3 h-32 w-56 object-cover rounded-lg border border-espresso/10"
          />
        )}
      </div>

      <div>
        <label htmlFor="tags" className="admin-label">Tags</label>
        <input
          id="tags"
          type="text"
          value={tagsRaw}
          onChange={(e) => onTagsChange(e.target.value)}
          className="admin-input"
          placeholder="Living Room, Styling, Cozy"
        />
        <p className="admin-help">Comma-separated. First few become the index card chips.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label htmlFor="body" className="admin-label">Body (Markdown)</label>
          <textarea
            id="body"
            value={form.body}
            onChange={(e) => update('body', e.target.value)}
            className="admin-textarea min-h-[480px] font-mono text-[13px]"
            placeholder={`## Section heading\n\nBody text with **bold**, *italic*, and [links](https://example.com).\n\n- Bullet one\n- Bullet two\n\n<Product asin="B0XXXXXXXX" />\n\n> A pull-quote.`}
          />
          <p className="admin-help">
            Supports <code>## ###</code> headings, paragraphs, <code>- lists</code>, <code>{'>'} quotes</code>, <code>**bold**</code>, <code>*italic*</code>, <code>[text](url)</code>, and the <code>&lt;Product asin=&quot;...&quot; /&gt;</code> tag.
          </p>
        </div>
        <div>
          <p className="admin-label">Live preview</p>
          <div className="rounded-lg border border-espresso/15 bg-cream p-5 min-h-[480px] max-h-[600px] overflow-y-auto">
            {form.body.trim() ? (
              <PostBodyPreview content={form.body} />
            ) : (
              <p className="text-sm text-espresso-soft italic">
                Start typing in the editor to see a preview.
              </p>
            )}
          </div>
        </div>
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.is_published}
          onChange={(e) => update('is_published', e.target.checked)}
          className="h-4 w-4 rounded border-espresso/20 text-terracotta focus:ring-terracotta"
        />
        <span className="text-sm text-espresso">Published (visible on the public site)</span>
      </label>

      <div className="flex items-center gap-2 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'Saving…' : isEdit ? 'Save changes' : 'Create post'}
        </button>
        <Link href="/admin/posts" className="btn-ghost">
          Cancel
        </Link>
      </div>
    </form>
  );
}
