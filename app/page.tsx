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

      <section className="container-wide pb-20">
        <AnimatedSection>
          <div className="mb-8 grid gap-4 rounded-lg border border-espresso/10 bg-white/70 p-5 shadow-sm backdrop-blur sm:grid-cols-[1fr_auto] sm:items-end sm:p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta">The Edit</p>
              <h2 className="mt-2 font-serif text-3xl text-espresso sm:text-4xl">
                Featured Finds
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-espresso-soft">
                A curated product wall for spaces that need texture, warmth, and a polished finishing touch.
              </p>
            </div>
            <Link href="/products" className="btn-secondary">
              See all finds
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, idx) => (
            <ProductCard key={p.asin} product={p} index={idx} />
          ))}
        </div>
      </section>

      <section className="container-wide py-10 sm:py-16">
        <AnimatedSection delay={0.1}>
          <NewsletterSignup />
        </AnimatedSection>
      </section>

      <section className="container-wide pb-24">
        <AnimatedSection>
          <div className="mb-8 grid gap-4 rounded-lg border border-espresso/10 bg-white/70 p-5 shadow-sm backdrop-blur sm:grid-cols-[1fr_auto] sm:items-end sm:p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta">From the Journal</p>
              <h2 className="mt-2 font-serif text-3xl text-espresso sm:text-4xl">
                Styling guides & ideas
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-espresso-soft">
                Room-by-room ideas for turning saved inspiration into a home that actually works.
              </p>
            </div>
            <Link href="/blog" className="btn-secondary">
              Read the journal
            </Link>
          </div>
        </AnimatedSection>

        {posts.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, idx) => (
              <PostCard key={post.slug} post={post} index={idx} />
            ))}
          </div>
        ) : (
          <p className="text-espresso-soft">No posts yet; check back soon.</p>
        )}
      </section>
    </>
  );
}
