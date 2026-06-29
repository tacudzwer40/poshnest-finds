import Link from 'next/link';
import { products } from '@/content/products';
import { getAllPosts } from '@/lib/mdx';
import { ProductCard } from '@/components/ProductCard';
import { PostCard } from '@/components/PostCard';
import { NewsletterSignup } from '@/components/NewsletterSignup';
import { Hero } from '@/components/home/Hero';
import { AnimatedSection } from '@/components/home/AnimatedSection';

export default async function HomePage() {
  const featured = products.slice(0, 6).map((p) => ({
    id: 0,
    asin: p.asin,
    title: p.title,
    tagline: p.tagline,
    category: p.category,
    price: p.price,
    image_url: p.image,
    is_active: true,
    position: 0,
  }));
  const posts = (await getAllPosts()).slice(0, 3);

  return (
    <>
      <Hero />

      {/* FEATURED FINDS */}
      <section className="container-wide pb-20">
        <AnimatedSection>
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold">The Edit</p>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-espresso">
                Featured Finds
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-espresso-soft hover:text-terracotta"
            >
              See all 12 finds →
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, idx) => (
            <ProductCard key={p.asin} product={p} index={idx} />
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container-wide py-16">
        <AnimatedSection delay={0.1}>
          <NewsletterSignup />
        </AnimatedSection>
      </section>

      {/* LATEST POSTS */}
      <section className="container-wide pb-24">
        <AnimatedSection>
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold">From the Journal</p>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-espresso">
                Styling guides & ideas
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-espresso-soft hover:text-terracotta"
            >
              All posts →
            </Link>
          </div>
        </AnimatedSection>

        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, idx) => (
              <PostCard key={post.slug} post={post} index={idx} />
            ))}
          </div>
        ) : (
          <p className="text-espresso-soft">No posts yet — check back soon.</p>
        )}
      </section>
    </>
  );
}
