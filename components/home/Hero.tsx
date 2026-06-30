'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PINTEREST_URL } from '@/lib/social';

const stats = [
  { value: '12+', label: 'Curated finds' },
  { value: '100%', label: 'Renter-friendly' },
  { value: 'Weekly', label: 'New picks' },
];

export function Hero() {
  return (
    <section className="container-wide pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden">
      <div className="grid gap-10 md:gap-12 md:grid-cols-12 md:items-center">
        <motion.div
          className="md:col-span-7"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="chip">Aesthetic Home &amp; Decor Ideas</span>
          <h1 className="mt-5 font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-balance text-espresso">
            Your home should feel like a{' '}
            <span className="italic text-terracotta-dark">luxury retreat</span>.
          </h1>
          <p className="mt-6 max-w-xl text-base sm:text-lg text-espresso-soft leading-relaxed text-pretty">
            {
              "I'm Zviko, and I spend hours hunting down the prettiest, most aesthetic home upgrades on Amazon so you don't have to — renter-friendly finds that look way more expensive than they are."
            }
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link href="/products" className="btn-primary">
              Browse the Finds
            </Link>
            <a
              href={PINTEREST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.62 11.18-.11-.95-.2-2.41.04-3.45.22-.94 1.4-5.96 1.4-5.96s-.36-.72-.36-1.78c0-1.67.97-2.92 2.17-2.92 1.02 0 1.52.77 1.52 1.69 0 1.03-.66 2.57-1 4-.28 1.2.6 2.17 1.78 2.17 2.13 0 3.77-2.25 3.77-5.5 0-2.87-2.06-4.88-5.01-4.88-3.41 0-5.42 2.56-5.42 5.21 0 1.03.4 2.14.89 2.74.1.12.11.22.08.34l-.33 1.36c-.05.22-.17.27-.4.16-1.5-.7-2.43-2.89-2.43-4.65 0-3.79 2.75-7.27 7.93-7.27 4.16 0 7.4 2.97 7.4 6.93 0 4.14-2.61 7.47-6.23 7.47-1.22 0-2.36-.63-2.75-1.38l-.75 2.85c-.27 1.04-1 2.35-1.49 3.15 1.12.35 2.31.53 3.54.53 6.63 0 12-5.37 12-12S18.63 0 12 0z" />
              </svg>
              Follow on Pinterest
            </a>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-espresso/10 pt-6">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-serif text-2xl sm:text-3xl text-espresso">{s.value}</dd>
                <p className="mt-1 text-xs uppercase tracking-widest text-espresso-soft">{s.label}</p>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          className="md:col-span-5"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_30px_60px_-30px_rgba(58,46,42,0.4)] lg:hover:-rotate-1 transition-transform duration-700">
            <Image
              src="/hero-retreat.png"
              alt="A warm, neutral-toned living room styled like a luxury retreat"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/45 via-transparent to-transparent" />
            <motion.div
              className="absolute bottom-5 left-5 right-5 rounded-2xl bg-cream/95 backdrop-blur-md px-5 py-4 shadow-lg"
              whileHover={{ y: -4 }}
            >
              <p className="text-xs uppercase tracking-widest text-terracotta font-semibold">
                {"This week's pick"}
              </p>
              <p className="mt-1 font-serif text-lg leading-snug text-espresso">
                The Boucle Accent Chair — soft, sculptural, and worth the allure.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
