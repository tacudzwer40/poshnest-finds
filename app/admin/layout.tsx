import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { AdminShell } from '@/components/admin/AdminShell';

export const metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

// Admin pages all touch the DB and depend on a session; render dynamically.
export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Defence-in-depth: middleware should have caught this, but guard anyway
  // so a server-component render can never run without a session.
  const session = await getSession();
  if (!session) {
    redirect('/login?next=/admin');
  }

  return <AdminShell username={session.username}>{children}</AdminShell>;
}
