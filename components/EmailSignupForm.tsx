'use client';

import { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'disabled';

export function EmailSignupForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email.');
      return;
    }
    if (!endpoint) {
      setStatus('disabled');
      setMessage('Newsletter signup is coming soon — check back!');
      return;
    }
    setStatus('submitting');
    setMessage('');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Signup failed');
      setStatus('success');
      setMessage("You're in. Check your inbox to confirm.");
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  const inputBase =
    'w-full rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2';
  const inputTheme = dark
    ? 'bg-cream/95 text-espresso placeholder:text-espresso-soft focus:ring-offset-espresso'
    : 'bg-cream text-espresso placeholder:text-espresso-soft border border-espresso/15';

  const submitBase =
    'btn-primary w-full whitespace-nowrap sm:w-auto';
  const submitTheme = dark ? '' : '';

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@inbox.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${inputBase} ${inputTheme}`}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={`${submitBase} ${submitTheme} ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {status === 'submitting' ? 'Joining…' : 'Join the Nestletter'}
        </button>
      </div>
      {message && (
        <p
          className={`mt-3 text-xs ${
            status === 'success'
              ? dark
                ? 'text-sage'
                : 'text-sage-dark'
              : status === 'error'
                ? 'text-terracotta-dark'
                : dark
                  ? 'text-cream/70'
                  : 'text-espresso-soft'
          }`}
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
