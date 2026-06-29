import Link from 'next/link';
import { getSession } from '@/lib/auth';
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
    <header className="sticky top-0 z-40 backdrop-blur-md bg-cream/80 border-b border-espresso/10">
      <div className="container-wide flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <MotionLogo />
          <span className="font-serif text-xl italic text-espresso tracking-tight">
            PoshNest
            <span className="font-sans not-italic text-[0.65rem] uppercase tracking-[0.25em] text-espresso-soft ml-2 align-middle">
              Finds
            </span>
          </span>
        </Link>

        {/* Center nav (desktop) */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2 rounded-full text-sm text-espresso-soft hover:text-espresso hover:bg-ivory transition"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/products" className="btn-primary ml-3 !py-1.5 !px-4 text-xs">
            Shop Finds
          </Link>
        </nav>

        {/* Right side: admin lock icon + mobile menu */}
        <div className="flex items-center gap-2">
          <AdminLock signedIn={!!session} />
          <details className="md:hidden relative">
            <summary className="list-none cursor-pointer p-2 rounded-md hover:bg-ivory">
              <span className="sr-only">Menu</span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </summary>
            <div className="absolute right-0 mt-2 w-44 rounded-xl border border-espresso/10 bg-cream shadow-lg p-2 flex flex-col">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="px-3 py-2 rounded-md text-sm hover:bg-ivory">
                  {l.label}
                </Link>
              ))}
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
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full
                  border transition-all duration-200
                  ${signedIn
          ? 'border-terracotta/40 bg-terracotta/10 text-terracotta hover:bg-terracotta/15'
          : 'border-espresso/15 bg-cream text-espresso-soft hover:border-espresso/30 hover:text-espresso'
        }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 1 1 8 0v4" />
      </svg>
      {signedIn && (
        <span
          aria-hidden
          className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-terracotta ring-2 ring-cream"
        />
      )}
    </Link>
  );
}