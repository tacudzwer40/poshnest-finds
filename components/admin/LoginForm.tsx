'use client';

import { useState } from 'react';

export function LoginForm({ next }: { next: string }) {
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? 'Invalid passkey.');
        setSubmitting(false);
        return;
      }
      window.location.href = next || '/admin';
    } catch {
      setError('Network error. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="passkey" className="block text-xs uppercase tracking-widest text-espresso-soft mb-1.5">
          Passkey
        </label>
        <input
          id="passkey"
          name="passkey"
          type="password"
          required
          value={passkey}
          onChange={(e) => setPasskey(e.target.value)}
          className="w-full rounded-lg border border-espresso/15 bg-cream px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 focus:ring-offset-cream"
          placeholder="Enter Passkey"
        />
      </div>
      {error && (
        <p
          role="alert"
          className="rounded-md bg-terracotta/10 border border-terracotta/30 px-3 py-2 text-sm text-terracotta-dark"
        >
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? 'Authenticating…' : 'Log in'}
      </button>
    </form>
  );
}