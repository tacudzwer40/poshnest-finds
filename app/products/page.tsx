'use client';

import { motion } from 'framer-motion';
import { products } from '@/content/products';
import { type Category, type PublicProduct } from '@/lib/constants';
import { ProductCard } from '@/components/ProductCard';
import { AffiliateDisclosure } from '@/components/AffiliateDisclosure';
import { Reveal } from '@/components/Reveal';

const allCategories: Category[] = [
  'Modern Kitchen Decor Ideas 2026',
  'Aesthetic Home Decor Ideas 2026',
  'Amazon Bedroom Finds | Cozy + Affordable',
  'Small Bathroom Organization',
  'Modern Home Decor Inspiration',
  'Bathroom Counter Styling Ideas',
  'Amazon Kitchen Finds | Aesthetic + Affordable',
  'Outdoor Decor Ideas | Patio & Garden',
  'Spa Bathroom Inspiration at Home',
  'Cozy & Minimalist Home Aesthetic',
];

export default function ProductsPage() {
  const mapped = products.map((p) => ({
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

  return (
    <div className="container-wide py-12 sm:py-16">
      <header className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-terracotta font-semibold">The Edit</p>
          <h1 className="mt-2 font-serif text-4xl sm:text-5xl text-espresso">
            Featured Finds
          </h1>
          <p className="mt-4 text-espresso-soft leading-relaxed">
            A growing list of the décor pieces we’d put in our own homes. Tap any
            card to view it on Amazon.
          </p>
        </motion.div>
      </header>

      <div className="mt-8">
        <AffiliateDisclosure />
      </div>

      <motion.nav
        aria-label="Categories"
        className="mt-8 flex flex-wrap gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {allCategories.map((cat) => {
          const count = mapped.filter((p) => p.category === cat).length;
          return (
            <a key={cat} href={`#${cat.replace(/\s+/g, '-').toLowerCase()}`} className="chip">
              {cat}
              <span className="ml-1 text-espresso-soft/70">{count}</span>
            </a>
          );
        })}
      </motion.nav>

      <div className="mt-10 space-y-16">
        {allCategories.map((cat) => {
          const list = mapped.filter((p) => p.category === cat);
          if (list.length === 0) return null;
          return (
            <section key={cat} id={cat.replace(/\s+/g, '-').toLowerCase()}>
              <Reveal width="100%">
                <div className="flex items-baseline justify-between mb-5">
                  <h2 className="font-serif text-2xl sm:text-3xl text-espresso">{cat}</h2>
                  <span className="text-xs uppercase tracking-widest text-espresso-soft">
                    {list.length} {list.length === 1 ? 'piece' : 'pieces'}
                  </span>
                </div>
              </Reveal>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((p, idx) => (
                  <ProductCard key={p.asin} product={p} index={idx} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
