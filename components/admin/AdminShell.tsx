import Link from 'next/link';
import { SignOutButton } from './SignOutButton';
import { AdminSidebar } from './AdminSidebar';

export function AdminShell({
  username,
  children,
}: {
  username: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-ivory/30 border-b border-espresso/10">
      <div className="container-wide py-4 flex items-center justify-between gap-4">
        <Link href="/admin" className="flex items-center gap-2 group">
          <span
            aria-hidden
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-terracotta/10 ring-1 ring-terracotta/30"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-terracotta"
            >
              <path d="M4 18c2-5 6-8 8-8s6 3 8 8" />
              <path d="M12 10c0-3 2-5 5-5" />
              <circle cx="17" cy="5" r="1.2" fill="currentColor" />
            </svg>
          </span>
          <span className="font-serif text-lg italic text-espresso leading-none">
            Admin
            <span className="ml-2 font-sans not-italic text-[0.6rem] uppercase tracking-[0.25em] text-espresso-soft align-middle">
              PoshNest
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-xs text-espresso-soft">
            Signed in as <span className="text-espresso font-medium">{username}</span>
          </span>
          <Link href="/" className="btn-ghost !py-1.5 !px-3 text-xs">
            View site
          </Link>
          <SignOutButton />
        </div>
      </div>

      <div className="container-wide grid gap-8 lg:grid-cols-[200px_1fr] pb-12">
        <AdminSidebar />
        <section className="min-w-0">{children}</section>
      </div>
    </div>
  );
}
