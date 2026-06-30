'use client';

import { motion } from 'framer-motion';
import { products } from '@/content/products';
import { type Category } from '@/lib/constants';
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

function categoryId(cat: string) {
  return cat.replace(/\s+/g, '-').toLowerCase();
}

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
    <div className="container-wide py-10 sm:py-16">
      <header className="grid gap-6 rounded-lg border border-espresso/10 bg-white/75 p-5 shadow-sm backdrop-blur lg:grid-cols-[1fr_0.8fr] lg:items-end lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta">The Edit</p>
          <h1 className="mt-2 max-w-3xl font-serif text-4xl leading-tight text-espresso sm:text-6xl">
            Curated Amazon finds for a softer, smarter home.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-espresso-soft">
            Shop by room mood, texture, and everyday usefulness. Each pick is chosen for the expensive-looking factor: shape, finish, scale, and styling potential.
          </p>
        </motion.div>
        <AffiliateDisclosure />
      </header>

      <motion.nav
        aria-label="Categories"
        className="mt-5 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        {allCategories.map((cat) => {
          const count = mapped.filter((p) => p.category === cat).length;
          return (
            <a key={cat} href={`#${categoryId(cat)}`} className="chip shrink-0">
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
            <section key={cat} id={categoryId(cat)} className="scroll-mt-24">
              <Reveal width="100%">
                <div className="mb-5 grid gap-2 border-b border-espresso/10 pb-4 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta">Room edit</p>
                    <h2 className="mt-1 font-serif text-2xl text-espresso sm:text-3xl">{cat}</h2>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-espresso-soft">
                    {list.length} {list.length === 1 ? 'piece' : 'pieces'}
                  </span>
                </div>
              </Reveal>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
