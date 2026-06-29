'use client';

import { useState } from 'react';

export function SignOutButton({ className }: { className?: string }) {
  const [busy, setBusy] = useState(false);

  async function onClick() {
    if (busy) return;
    setBusy(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {
      // ignore network errors — cookie may still be cleared server-side
    }
    window.location.href = '/login';
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className={className ?? 'btn-secondary !py-1.5 !px-4 text-xs'}
    >
      {busy ? 'Signing out…' : 'Sign out'}
    </button>
  );
}
