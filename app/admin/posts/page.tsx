import Link from 'next/link';
import { getAllPostsAdmin } from '@/lib/posts';
import { DeleteAction } from '@/components/admin/DeleteAction';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin · Posts',
  robots: { index: false, follow: false },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default async function AdminPostsPage() {
  const posts = await getAllPostsAdmin();

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-terracotta">Content</p>
          <h1 className="mt-2 font-serif text-3xl text-espresso">Posts</h1>
          <p className="mt-1 text-sm text-espresso-soft">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} in the database.
          </p>
        </div>
        <Link href="/admin/posts/new" className="btn-primary !py-1.5 !px-4 text-xs">
          + New post
        </Link>
      </header>

      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Tags</th>
                <th>Published</th>
                <th>Status</th>
                <th className="text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-espresso-soft italic">
                    No posts yet. <Link href="/admin/posts/new" className="text-terracotta hover:underline">Create the first one</Link>.
                  </td>
                </tr>
              ) : (
                posts.map((p) => (
                  <tr key={p.id}>
                    <td className="font-medium text-espresso">
                      <Link
                        href={`/admin/posts/${p.id}`}
                        className="hover:text-terracotta-dark"
                      >
                        {p.title}
                      </Link>
                      {p.description && (
                        <span className="block text-xs text-espresso-soft font-normal mt-0.5 truncate max-w-md">
                          {p.description}
                        </span>
                      )}
                    </td>
                    <td className="font-mono text-xs">/{p.slug}</td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {p.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-ivory text-espresso-soft"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="text-espresso-soft whitespace-nowrap">
                      {formatDate(p.published_at)}
                    </td>
                    <td>
                      <span
                        className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full
                                    ${
                                      (p as { is_published?: boolean }).is_published
                                        ? 'bg-sage/15 text-sage-dark'
                                        : 'bg-ivory text-espresso-soft'
                                    }`}
                      >
                        {(p as { is_published?: boolean }).is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/posts/${p.id}`}
                          className="text-xs text-espresso-soft hover:text-espresso"
                        >
                          Edit
                        </Link>
                        <DeleteAction
                          endpoint={`/api/admin/posts/${p.id}`}
                          title={`Delete "${p.title}"?`}
                          body="This will permanently remove the post from the database. This cannot be undone."
                        >
                          <span className="text-xs text-terracotta-dark hover:text-terracotta">
                            Delete
                          </span>
                        </DeleteAction>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}