import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts, getPost } from '@/lib/mdx';
import { RenderMdx } from '@/lib/mdx-render';
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure';
import { NewsletterSignup } from '@/components/NewsletterSignup';
import { AMAZON_DISCLOSURE_SHORT } from '@/lib/amazon';

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Params },
): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Post not found' };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

function formatDate(iso: string) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function PostPage({ params }: { params: Params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const allPosts = await getAllPosts();
  const related = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="bg-cream">
      <header className="container-narrow pt-12 pb-8 sm:pt-20">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-espresso-soft">
          <Link href="/blog" className="hover:text-terracotta">Blog</Link>
          <span>/</span>
          <span>{formatDate(post.date)}</span>
        </div>
        <h1 className="mt-4 font-serif text-4xl sm:text-6xl leading-[1.1] text-espresso">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-5 text-lg text-espresso-soft leading-relaxed">
            {post.description}
          </p>
        )}
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags?.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
      </header>

      <div className="container-narrow pb-6">
        <AffiliateDisclosure />
      </div>

      <div className="container-narrow pb-20">
        <RenderMdx content={post.content} />

        <div className="mt-12 rounded-xl border border-espresso/10 bg-ivory/40 px-5 py-4 text-xs italic text-espresso-soft">
          {AMAZON_DISCLOSURE_SHORT} Prices and availability are accurate as of
          the date published and are subject to change.
        </div>
      </div>

      <div className="container-wide pb-20">
        <NewsletterSignup />
      </div>

      {related.length > 0 && (
        <section className="container-wide pb-24">
          <h2 className="font-serif text-3xl text-espresso mb-8">More from PoshNest</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="card group block p-5"
              >
                <p className="text-xs uppercase tracking-widest text-terracotta">
                  {formatDate(p.date)}
                </p>
                <h3 className="mt-2 font-serif text-xl text-espresso group-hover:text-terracotta-dark transition">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-espresso-soft line-clamp-2">
                  {p.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
