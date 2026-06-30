import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/mdx';
import { PostCard } from '@/components/PostCard';

export const metadata: Metadata = {
  title: 'Blog — Styling Guides & Home Ideas',
  description: 'Aesthetic home décor guides, styling tips, and curated roundups.',
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div className="container-wide py-12 sm:py-16">
      <header className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-terracotta">The Journal</p>
        <h1 className="mt-2 font-serif text-4xl text-espresso sm:text-6xl">
          Styling guides & home ideas
        </h1>
        <p className="mt-5 text-espresso-soft leading-relaxed">
          Practical guides and curated roundups to help you build a home that
          feels calm, considered, and unmistakably yours.
        </p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 ? (
          posts.map((p) => <PostCard key={p.slug} post={p} />)
        ) : (
          <p className="text-espresso-soft col-span-full">No posts yet.</p>
        )}
      </div>
    </div>
  );
}
