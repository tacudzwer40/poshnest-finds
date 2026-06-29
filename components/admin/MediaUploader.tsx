'use client';

import { useState } from 'react';
import { ConfirmModal } from './ConfirmModal';
import type { MediaItem } from '@/types/admin';

export function MediaUploader({ initial }: { initial: MediaItem[] }) {
  const [items, setItems] = useState<MediaItem[]>(initial);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [pendingDelete, setPendingDelete] = useState<MediaItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function uploadFiles(files: FileList | File[]) {
    setError('');
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/admin/media', {
          method: 'POST',
          body: fd,
        });
        if (!res.ok) {
          const data = (await res.json().catch(() => ({}))) as { error?: string };
          setError(`${file.name}: ${data.error ?? 'Upload failed.'}`);
          continue;
        }
        const data = (await res.json()) as { ok: true; media: MediaItem };
        setItems((prev) => [data.media, ...prev]);
      }
    } finally {
      setUploading(false);
    }
  }

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      uploadFiles(e.target.files);
      e.target.value = '';
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadFiles(e.dataTransfer.files);
    }
  }

  async function onConfirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/media/${pendingDelete.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setItems((prev) => prev.filter((m) => m.id !== pendingDelete.id));
      } else {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? 'Delete failed.');
      }
    } finally {
      setDeleting(false);
      setPendingDelete(null);
    }
  }

  return (
    <div className="space-y-6">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`relative rounded-2xl border-2 border-dashed transition p-8 text-center
                    ${
                      dragging
                        ? 'border-terracotta bg-terracotta/5'
                        : 'border-espresso/15 bg-cream hover:border-espresso/30'
                    }`}
      >
        <p className="font-serif text-lg text-espresso">
          {uploading ? 'Uploading…' : 'Drop images here'}
        </p>
        <p className="mt-1 text-sm text-espresso-soft">
          JPEG, PNG, WebP, GIF, or AVIF. Max 10&nbsp;MB each.
        </p>
        <label className="mt-4 inline-block">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
            multiple
            onChange={onPick}
            disabled={uploading}
            className="sr-only"
          />
          <span className="btn-primary cursor-pointer">
            {uploading ? 'Uploading…' : 'Choose files'}
          </span>
        </label>
        {error && (
          <p
            role="alert"
            className="mt-3 text-sm text-terracotta-dark"
          >
            {error}
          </p>
        )}
      </div>

      <div>
        <p className="admin-label">Library ({items.length})</p>
        {items.length === 0 ? (
          <p className="text-sm text-espresso-soft italic">
            No uploads yet. Drop a file above to get started.
          </p>
        ) : (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((m) => (
              <div
                key={m.id}
                className="rounded-xl border border-espresso/10 bg-cream overflow-hidden flex flex-col"
              >
                <div className="aspect-square bg-ivory/40 flex items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.url}
                    alt={m.alt || m.original_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 flex-1 flex flex-col">
                  <p className="text-xs text-espresso truncate" title={m.original_name}>
                    {m.original_name}
                  </p>
                  <p className="text-[10px] text-espresso-soft mt-0.5">
                    {(m.size_bytes / 1024).toFixed(0)} KB
                    {m.width && m.height ? ` · ${m.width}×${m.height}` : ''}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard
                          .writeText(m.url)
                          .catch(() => undefined);
                      }}
                      className="text-[11px] text-espresso-soft hover:text-espresso"
                      title="Copy URL"
                    >
                      Copy URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setPendingDelete(m)}
                      className="text-[11px] text-terracotta-dark hover:text-terracotta ml-auto"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        open={!!pendingDelete}
        title="Delete this image?"
        body={
          pendingDelete && (
            <span>
              <span className="font-mono text-xs">{pendingDelete.original_name}</span> will be removed from the library and deleted from disk. This cannot be undone.
            </span>
          )
        }
        confirmLabel="Delete"
        destructive
        busy={deleting}
        onConfirm={onConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}