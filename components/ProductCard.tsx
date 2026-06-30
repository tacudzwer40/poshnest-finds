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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <a
        href={href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="card group block overflow-hidden"
      >
        <div
          className={`relative w-full overflow-hidden bg-ivory ${compact ? 'aspect-square' : 'aspect-[4/5]'
            }`}
        >
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
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ivory to-cream text-espresso-soft/40 text-xs uppercase tracking-widest"
            >
              No image
            </div>
          )}
          <span className="absolute top-3 left-3 chip">
            {product.category}
          </span>
        </div>
        <div className="p-4 sm:p-5">
          <h3 className="font-serif text-lg leading-snug text-espresso group-hover:text-terracotta transition-colors duration-300">
            {product.title}
          </h3>
          <p className="mt-1.5 text-sm text-espresso-soft line-clamp-2">
            {product.tagline}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-medium text-espresso bg-ivory/50 px-2 py-0.5 rounded">{product.price}</span>
            <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-terracotta transition-all group-hover:gap-2">
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
