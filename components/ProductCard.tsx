'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { PublicProduct } from '@/lib/constants';
import { productHref } from '@/lib/amazon';

type Props = {
  product: PublicProduct;
  compact?: boolean;
  index?: number;
};

export function ProductCard({ product, compact, index = 0 }: Props) {
  const href = productHref(product);
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <a
        href={href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="card group grid h-full overflow-hidden"
      >
        <div className={`relative w-full overflow-hidden bg-ivory ${compact ? 'aspect-square' : 'aspect-[4/5]'}`}>
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div
              aria-hidden
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ivory to-cream text-xs uppercase tracking-widest text-espresso-soft/40"
            >
              No image
            </div>
          )}
          <span className="chip absolute left-3 top-3 bg-cream/95">
            {product.category}
          </span>
        </div>
        <div className="flex flex-col p-4 sm:p-5">
          <h3 className="font-serif text-xl leading-snug text-espresso transition-colors duration-300 group-hover:text-terracotta-dark">
            {product.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-espresso-soft">
            {product.tagline}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-espresso/10 pt-4">
            <span className="rounded-md bg-ivory px-2.5 py-1 text-sm font-semibold text-espresso">{product.price}</span>
            <span className="inline-flex items-center gap-1 rounded-md bg-espresso px-3 py-2 text-xs font-semibold uppercase tracking-wider text-cream transition-all group-hover:bg-terracotta-dark">
              View on Amazon
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="13 6 19 12 13 18" />
              </svg>
            </span>
          </div>
        </div>
      </a>
    </motion.div>
  );
}
