'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ALL_CATEGORIES } from '@/lib/constants';
import type { ProductInput } from '@/types/admin';

type Mode = { kind: 'create' } | { kind: 'edit'; id: number };

const EMPTY: ProductInput = {
  asin: '',
  title: '',
  tagline: '',
  category: 'Modern Living Room Decor Ideas 2026',
  price: '',
  image_url: '',
  is_active: true,
  position: 0,
};

export function ProductForm({
  mode,
  initial,
}: {
  mode: Mode;
  initial?: ProductInput;
}) {
  const [form, setForm] = useState<ProductInput>(initial ?? EMPTY);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isEdit = mode.kind === 'edit';
  const editId = mode.kind === 'edit' ? mode.id : null;

  function update<K extends keyof ProductInput>(key: K, value: ProductInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const url = isEdit ? `/api/admin/products/${editId}` : '/api/admin/products';
      const method = isEdit ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? `Failed to ${isEdit ? 'update' : 'create'} product.`);
        setSubmitting(false);
        return;
      }
      window.location.href = '/admin/products';
    } catch {
      setError('Network error. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-2xl">
      {error && (
        <p
          role="alert"
          className="rounded-md bg-terracotta/10 border border-terracotta/30 px-3 py-2 text-sm text-terracotta-dark"
        >
          {error}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="asin" className="admin-label">ASIN</label>
          <input
            id="asin"
            type="text"
            required
            value={form.asin}
            onChange={(e) => update('asin', e.target.value.toUpperCase().trim())}
            className="admin-input font-mono"
            placeholder="B0XXXXXXXX"
            maxLength={20}
          />
          <p className="admin-help">Must be enrolled in your Amazon Associates account.</p>
        </div>
        <div>
          <label htmlFor="category" className="admin-label">Category</label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => update('category', e.target.value as ProductInput['category'])}
            className="admin-input"
          >
            {ALL_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="title" className="admin-label">Title</label>
        <input
          id="title"
          type="text"
          required
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
          className="admin-input"
          placeholder="Linen Curtain Panel"
          maxLength={200}
        />
      </div>

      <div>
        <label htmlFor="tagline" className="admin-label">Tagline</label>
        <input
          id="tagline"
          type="text"
          value={form.tagline}
          onChange={(e) => update('tagline', e.target.value)}
          className="admin-input"
          placeholder="One-line description shown on the card."
          maxLength={300}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className="admin-label">Price label</label>
          <input
            id="price"
            type="text"
            value={form.price}
            onChange={(e) => update('price', e.target.value)}
            className="admin-input"
            placeholder="$XX"
            maxLength={40}
          />
          <p className="admin-help">Editorial label, not a live price feed.</p>
        </div>
        <div>
          <label htmlFor="position" className="admin-label">Position</label>
          <input
            id="position"
            type="number"
            min={0}
            value={form.position}
            onChange={(e) => update('position', Number(e.target.value) || 0)}
            className="admin-input"
          />
          <p className="admin-help">Lower = earlier in the list.</p>
        </div>
      </div>

      <div>
        <label htmlFor="image_url" className="admin-label">Image URL</label>
        <input
          id="image_url"
          type="url"
          value={form.image_url}
          onChange={(e) => update('image_url', e.target.value)}
          className="admin-input"
          placeholder="https://m.media-amazon.com/images/..."
          maxLength={1000}
        />
        {form.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={form.image_url}
            alt=""
            className="mt-3 h-24 w-24 object-cover rounded-lg border border-espresso/10"
          />
        )}
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.is_active}
          onChange={(e) => update('is_active', e.target.checked)}
          className="h-4 w-4 rounded border-espresso/20 text-terracotta focus:ring-terracotta"
        />
        <span className="text-sm text-espresso">Active (visible on the public site)</span>
      </label>

      <div className="flex items-center gap-2 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'Saving…' : isEdit ? 'Save changes' : 'Create product'}
        </button>
        <Link href="/admin/products" className="btn-ghost">
          Cancel
        </Link>
      </div>
    </form>
  );
}
