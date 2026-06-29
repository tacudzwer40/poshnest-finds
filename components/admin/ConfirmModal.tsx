'use client';

import { useEffect, useRef } from 'react';

export type ConfirmModalProps = {
  open: boolean;
  title: string;
  body?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  busy?: boolean;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  open,
  title,
  body,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  busy = false,
  destructive = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Close on Escape — the dialog fires `close` natively
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => onCancel();
    dialog.addEventListener('close', onClose);
    return () => dialog.removeEventListener('close', onClose);
  }, [onCancel]);

  // Click on backdrop (outside the inner content) cancels.
  function onClickBackdrop(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) {
      onCancel();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={onClickBackdrop}
      className="rounded-2xl border border-espresso/10 bg-cream p-0 max-w-md w-[92vw] shadow-2xl backdrop:bg-espresso/30"
    >
      <div className="p-6 sm:p-7">
        <h2 className="font-serif text-xl text-espresso">{title}</h2>
        {body && <div className="mt-2 text-sm text-espresso-soft">{body}</div>}
        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="btn-secondary disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className={
              destructive
                ? 'btn bg-terracotta text-cream shadow-sm hover:bg-terracotta-dark hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed'
                : 'btn-primary disabled:opacity-60 disabled:cursor-not-allowed'
            }
          >
            {busy ? 'Working…' : confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
