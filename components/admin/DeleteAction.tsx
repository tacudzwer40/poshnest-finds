'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ConfirmModal } from './ConfirmModal';

type Props = {
  endpoint: string;
  /** Element that triggers the confirm modal (button, link, etc.) */
  children: React.ReactNode;
  /** Confirmation title and body. */
  title: string;
  body?: React.ReactNode;
  /** Called after a successful delete. Defaults to router.refresh(). */
  onDeleted?: () => void;
};

/**
 * A button that asks for confirmation, then DELETEs the resource.
 * Renders children inside a `<button>`; the ConfirmModal is shared via React state.
 */
export function DeleteAction({
  endpoint,
  children,
  title,
  body,
  onDeleted,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function onConfirm() {
    setError('');
    setBusy(true);
    try {
      const res = await fetch(endpoint, { method: 'DELETE' });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? 'Delete failed.');
        setBusy(false);
        return;
      }
      setOpen(false);
      setBusy(false);
      if (onDeleted) onDeleted();
      else router.refresh();
    } catch {
      setError('Network error. Please try again.');
      setBusy(false);
    }
  }

  return (
    <>
      <span
        onClick={() => {
          setError('');
          setOpen(true);
        }}
        className="cursor-pointer"
      >
        {children}
      </span>
      <ConfirmModal
        open={open}
        title={title}
        body={
          <>
            {body}
            {error && (
              <span className="block mt-2 text-terracotta-dark">{error}</span>
            )}
          </>
        }
        confirmLabel="Delete"
        destructive
        busy={busy}
        onConfirm={onConfirm}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}