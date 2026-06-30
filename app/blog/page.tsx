import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/mdx';
import { PostCard } from '@/components/PostCard';

export const metadata: Metadata = {
  title: 'Blog - Styling Guides & Home Ideas',
  description: 'Aesthetic home decor guides, styling tips, and curated roundups.',
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div className="container-wide py-10 sm:py-16">
      <header className="rounded-lg border border-espresso/10 bg-white/75 p-5 shadow-sm backdrop-blur sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta">The Journal</p>
        <h1 className="mt-2 max-w-3xl font-serif text-4xl leading-tight text-espresso sm:text-6xl">
          Styling guides for rooms that feel saved, not staged.
        </h1>
        <p className="mt-5 max-w-2xl leading-7 text-espresso-soft">
          Practical guides and curated roundups to help you build a home that feels calm, considered, and unmistakably yours.
        </p>
      </header>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 ? (
          posts.map((p) => <PostCard key={p.slug} post={p} />)
        ) : (
          <p className="col-span-full text-espresso-soft">No posts yet.</p>
        )}
      </div>
    </div>
  );
}
