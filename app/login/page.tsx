import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { LoginForm } from '@/components/admin/LoginForm';

export const metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false },
};

type Search = { next?: string };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Search;
}) {
  const session = await getSession();
  if (session) {
    redirect(searchParams.next ?? '/admin');
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 mb-10 group">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-terracotta/10 ring-1 ring-terracotta/30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-terracotta">
              <path d="M4 18c2-5 6-8 8-8s6 3 8 8" />
              <path d="M12 10c0-3 2-5 5-5" />
              <circle cx="17" cy="5" r="1.2" fill="currentColor" />
            </svg>
          </span>
          <span className="font-serif text-2xl italic text-espresso">
            PoshNest
            <span className="font-sans not-italic text-[0.65rem] uppercase tracking-[0.25em] text-espresso-soft ml-2 align-middle">
              Finds
            </span>
          </span>
        </Link>

        <div className="card p-7 sm:p-9">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-terracotta/10 text-terracotta mb-5">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 1 1 8 0v4" />
            </svg>
          </div>
          <h1 className="font-serif text-3xl text-espresso">Sign in</h1>
          <p className="mt-2 text-sm text-espresso-soft">
            Admin access only. New here?{' '}
            <Link href="/" className="text-terracotta hover:underline">
              Back to the site
            </Link>
            .
          </p>
          <LoginForm next={searchParams.next ?? '/admin'} />
        </div>

        <p className="mt-6 text-center text-xs text-espresso-soft">
          Protected area — unauthorised access is logged.
        </p>
      </div>
    </div>
  );
}