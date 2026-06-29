'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { PostSummary } from '@/lib/mdx';

function formatDate(iso: string) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function PostCard({ post, index = 0 }: { post: PostSummary, index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`} className="card group block overflow-hidden">
        <div className="relative aspect-[16/10] bg-ivory overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-ivory to-cream lg:group-hover:bg-terracotta/5 transition-colors duration-500" />
          <div className="absolute inset-0 flex items-end p-5">
            <div className="flex flex-wrap gap-1.5">
              {post.tags?.slice(0, 2).map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="p-5">
          <p className="text-xs uppercase tracking-widest text-terracotta">
            {formatDate(post.date)}
          </p>
          <h3 className="mt-2 font-serif text-xl leading-snug text-espresso group-hover:text-terracotta transition-colors duration-300">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-espresso-soft line-clamp-2">
            {post.description}
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-terracotta group-hover:gap-2 transition-all">
            Read more
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="13 6 19 12 13 18" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
