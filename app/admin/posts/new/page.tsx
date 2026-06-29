import Link from 'next/link';
import { PostForm } from '@/components/admin/PostForm';

export const metadata = {
  title: 'Admin · New post',
  robots: { index: false, follow: false },
};

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.25em] text-terracotta">Content</p>
        <h1 className="mt-2 font-serif text-3xl text-espresso">New post</h1>
        <p className="mt-1 text-sm text-espresso-soft">
          Write a post in Markdown. The slug is auto-generated from the title; override if you need to.
        </p>
      </header>
      <Link href="/admin/posts" className="text-xs text-terracotta hover:underline inline-block">
        ← Back to posts
      </Link>
      <PostForm mode={{ kind: 'create' }} />
    </div>
  );
}