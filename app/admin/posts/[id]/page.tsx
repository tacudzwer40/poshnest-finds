import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostById } from '@/lib/posts';
import { PostForm } from '@/components/admin/PostForm';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin · Edit post',
  robots: { index: false, follow: false },
};

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (!Number.isFinite(id) || id <= 0) notFound();
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.25em] text-terracotta">Content</p>
        <h1 className="mt-2 font-serif text-3xl text-espresso">{post.title}</h1>
        <p className="mt-1 text-sm text-espresso-soft font-mono">/{post.slug}</p>
      </header>
      <Link href="/admin/posts" className="text-xs text-terracotta hover:underline inline-block">
        ← Back to posts
      </Link>
      <PostForm mode={{ kind: 'edit', id }} initial={post} />
    </div>
  );
}