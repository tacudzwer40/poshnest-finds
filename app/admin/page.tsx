import Link from 'next/link';
import { getAllProducts } from '@/lib/products';
import { getAllPostsAdmin } from '@/lib/posts';
import { listMedia } from '@/lib/media';
import { getSettings } from '@/lib/settings';

export const dynamic = 'force-dynamic';

function StatCard({
  label,
  value,
  hint,
  href,
}: {
  label: string;
  value: number | string;
  hint?: string;
  href?: string;
}) {
  const inner = (
    <div className="stat-card">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
      {hint && <p className="mt-1 text-xs text-espresso-soft">{hint}</p>}
    </div>
  );
  return href ? (
    <Link href={href} className="block group">
      {inner}
    </Link>
  ) : (
    inner
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default async function AdminDashboardPage() {
  const [products, posts, media, settings] = await Promise.all([
    getAllProducts(),
    getAllPostsAdmin(),
    listMedia(),
    getSettings(),
  ]);

  const activeProducts = products.filter((p) => p.is_active).length;
  // PostSummary doesn't include is_published in its type; the row has it.
  const publishedPosts = posts.filter((p) => (p as { is_published?: boolean }).is_published).length;
  const latestPosts = posts.slice(0, 5);
  const latestMedia = media.slice(0, 6);

  return (
    <div className="space-y-10">
      <header>
        <p className="text-xs uppercase tracking-[0.25em] text-terracotta">Overview</p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl text-espresso">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-espresso-soft">
          Quick view of the catalog, content, and media library. Jump to any section from the sidebar.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Products"
          value={products.length}
          hint={`${activeProducts} active`}
          href="/admin/products"
        />
        <StatCard
          label="Posts"
          value={posts.length}
          hint={`${publishedPosts} published`}
          href="/admin/posts"
        />
        <StatCard
          label="Media files"
          value={media.length}
          href="/admin/media"
        />
        <StatCard
          label="Site title"
          value={settings.site_title || '—'}
          hint={settings.site_tagline}
          href="/admin/settings"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <header className="flex items-baseline justify-between mb-4">
            <h2 className="font-serif text-xl text-espresso">Latest posts</h2>
            <Link href="/admin/posts" className="text-xs text-terracotta hover:underline">
              View all →
            </Link>
          </header>
          {latestPosts.length === 0 ? (
            <p className="text-sm text-espresso-soft italic">
              No posts yet. <Link href="/admin/posts/new" className="text-terracotta hover:underline">Create the first one</Link>.
            </p>
          ) : (
            <ul className="space-y-3">
              {latestPosts.map((p) => (
                <li
                  key={p.id}
                  className="rounded-xl border border-espresso/10 bg-cream p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/admin/posts/${p.id}`}
                        className="font-serif text-espresso hover:text-terracotta-dark"
                      >
                        {p.title}
                      </Link>
                      <p className="mt-0.5 text-xs text-espresso-soft">
                        <span className="font-mono">/{p.slug}</span>
                        {' · '}
                        {formatDate(p.published_at)}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full
                                  ${
                                    (p as { is_published?: boolean }).is_published
                                      ? 'bg-sage/15 text-sage-dark'
                                      : 'bg-ivory text-espresso-soft'
                                  }`}
                    >
                      {(p as { is_published?: boolean }).is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <header className="flex items-baseline justify-between mb-4">
            <h2 className="font-serif text-xl text-espresso">Recent media</h2>
            <Link href="/admin/media" className="text-xs text-terracotta hover:underline">
              View all →
            </Link>
          </header>
          {latestMedia.length === 0 ? (
            <p className="text-sm text-espresso-soft italic">
              No uploads yet. <Link href="/admin/media" className="text-terracotta hover:underline">Upload some</Link>.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {latestMedia.map((m) => (
                <div
                  key={m.id}
                  className="aspect-square rounded-xl overflow-hidden border border-espresso/10 bg-ivory/40"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.url}
                    alt={m.alt || m.original_name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="card p-6">
        <h2 className="font-serif text-lg text-espresso">Quick actions</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link href="/admin/products/new" className="btn-primary !py-1.5 !px-4 text-xs">
            + New product
          </Link>
          <Link href="/admin/posts/new" className="btn-secondary !py-1.5 !px-4 text-xs">
            + New post
          </Link>
          <Link href="/admin/media" className="btn-secondary !py-1.5 !px-4 text-xs">
            Upload media
          </Link>
          <Link href="/" className="btn-ghost !py-1.5 !px-4 text-xs">
            View public site →
          </Link>
        </div>
      </section>
    </div>
  );
}