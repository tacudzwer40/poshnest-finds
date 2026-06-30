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
      className="h-full"
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={`/blog/${post.slug}`} className="card group block h-full overflow-hidden">
        <div className="relative aspect-[16/10] overflow-hidden bg-ivory">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(242,235,221,0.96),rgba(250,246,241,0.7)),url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 flex items-end p-4">
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
          <h3 className="mt-2 font-serif text-xl leading-snug text-espresso transition-colors duration-300 group-hover:text-terracotta-dark">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-espresso-soft">
            {post.description}
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-terracotta transition-all group-hover:gap-2">
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
