import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { PINTEREST_URL } from '@/lib/brand';
import { MotionLogo } from './MotionLogo';

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Finds' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export async function Navbar() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-40 border-b border-espresso/10 bg-cream/90 backdrop-blur-xl">
      <div className="container-wide flex h-16 items-center justify-between gap-3">
        <Link href="/" className="group flex min-w-0 items-center gap-2">
          <MotionLogo />
          <span className="truncate font-serif text-lg italic tracking-tight text-espresso sm:text-xl">
            PoshNest
            <span className="ml-1 align-middle font-sans text-[0.6rem] uppercase tracking-[0.18em] text-espresso-soft not-italic sm:ml-2 sm:text-[0.65rem] sm:tracking-[0.25em]">
              Finds
            </span>
          </span>
        </Link>

        <nav className="hidden items-center rounded-lg border border-espresso/10 bg-white/60 p-1 shadow-sm md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-espresso-soft transition hover:bg-cream hover:text-espresso"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/products" className="btn-primary ml-2 !min-h-9 !px-4 !py-1.5 text-xs">
            Shop Finds
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <AdminLock signedIn={!!session} />
          <a
            href={PINTEREST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center justify-center rounded-lg border border-espresso/15 bg-white/70 px-3 text-xs font-semibold uppercase tracking-wider text-terracotta-dark shadow-sm transition hover:border-terracotta/40 hover:bg-cream sm:inline-flex"
          >
            Pinterest
          </a>
          <details className="relative md:hidden">
            <summary className="list-none cursor-pointer rounded-lg border border-espresso/15 bg-white/70 p-2 shadow-sm hover:bg-cream">
              <span className="sr-only">Menu</span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </summary>
            <div className="absolute right-0 mt-2 flex w-[min(18rem,calc(100vw-2rem))] flex-col rounded-lg border border-espresso/10 bg-cream p-2 shadow-xl">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-ivory">
                  {l.label}
                </Link>
              ))}
              <a
                href={PINTEREST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md px-3 py-2 text-sm font-medium text-terracotta-dark hover:bg-ivory"
              >
                Pinterest
              </a>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

function AdminLock({ signedIn }: { signedIn: boolean }) {
  const href = signedIn ? '/admin' : '/login';
  const label = signedIn ? 'Admin (signed in)' : 'Admin sign in';

  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-lg
                  border bg-white/70 shadow-sm transition-all duration-200
                  ${signedIn
          ? 'border-terracotta/40 text-terracotta hover:bg-terracotta/10'
          : 'border-espresso/15 text-espresso-soft hover:border-espresso/30 hover:bg-cream hover:text-espresso'
        }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 1 1 8 0v4" />
      </svg>
      {signedIn && (
        <span
          aria-hidden
          className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-terracotta ring-2 ring-cream"
        />
      )}
    </Link>
  );
}
