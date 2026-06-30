'use client';

import { useState } from 'react';
import type { SettingsInput } from '@/types/admin';

export function SettingsForm({ initial }: { initial: SettingsInput }) {
  const [form, setForm] = useState<SettingsInput>(initial);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  function update<K extends keyof SettingsInput>(key: K, value: SettingsInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaved(false);
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? 'Failed to save settings.');
        setSubmitting(false);
        return;
      }
      const data = (await res.json()) as { ok: true; settings: SettingsInput };
      setForm(data.settings);
      setSaved(true);
      setSubmitting(false);
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
      {saved && (
        <p
          role="status"
          className="rounded-md bg-sage/10 border border-sage/30 px-3 py-2 text-sm text-sage-dark"
        >
          Saved.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="site_title" className="admin-label">Site title</label>
          <input
            id="site_title"
            type="text"
            value={form.site_title}
            onChange={(e) => update('site_title', e.target.value)}
            className="admin-input"
            maxLength={200}
          />
        </div>
        <div>
          <label htmlFor="site_tagline" className="admin-label">Tagline</label>
          <input
            id="site_tagline"
            type="text"
            value={form.site_tagline}
            onChange={(e) => update('site_tagline', e.target.value)}
            className="admin-input"
            maxLength={300}
          />
        </div>
      </div>

      <div>
        <label htmlFor="amazon_tag" className="admin-label">Amazon Associates tag</label>
        <input
          id="amazon_tag"
          type="text"
          value={form.amazon_tag}
          onChange={(e) => update('amazon_tag', e.target.value)}
          className="admin-input font-mono"
          placeholder="zdamazon04-20"
          maxLength={100}
        />
        <p className="admin-help">
          Used to build every Amazon link. Set in <code>.env.local</code> as a default; override here.
        </p>
      </div>

      <div>
        <label htmlFor="newsletter_endpoint" className="admin-label">Newsletter endpoint</label>
        <input
          id="newsletter_endpoint"
          type="url"
          value={form.newsletter_endpoint}
          onChange={(e) => update('newsletter_endpoint', e.target.value)}
          className="admin-input"
          placeholder="https://buttondown.email/.../api/emails/embed-subscribe"
          maxLength={1000}
        />
        <p className="admin-help">
          Leave blank to show &ldquo;coming soon&rdquo; in the public newsletter form.
        </p>
      </div>

      <div>
        <label htmlFor="disclosure_text" className="admin-label">Disclosure text</label>
        <textarea
          id="disclosure_text"
          value={form.disclosure_text}
          onChange={(e) => update('disclosure_text', e.target.value)}
          className="admin-textarea min-h-[180px]"
          placeholder="FTC-required affiliate disclosure text. Appears on the /disclosure page."
          maxLength={10_000}
        />
      </div>

      <div className="flex items-center gap-2 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'Saving…' : 'Save settings'}
        </button>
      </div>
    </form>
  );
}
