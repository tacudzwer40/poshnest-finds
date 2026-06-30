'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AMAZON_PRODUCT_IMAGES, PINTEREST_URL } from '@/lib/brand';

export function Hero() {
    return (
        <section className="container-wide pb-14 pt-8 sm:pb-20 sm:pt-14">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.78fr)] lg:items-center">
                <motion.div
                    className="relative z-10"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                    <div className="mb-5 flex flex-wrap items-center gap-2">
                        <span className="chip">Aesthetic Home Finds</span>
                        <span className="chip bg-espresso text-cream">Amazon curated</span>
                    </div>
                    <h1 className="max-w-4xl font-serif text-[2.85rem] leading-[0.95] tracking-tight text-espresso sm:text-6xl lg:text-7xl">
                        Make the room feel collected, warm, and quietly expensive.
                    </h1>
                    <p className="mt-6 max-w-2xl text-base leading-7 text-espresso-soft sm:text-lg">
                        PoshNest Finds curates renter-friendly Amazon decor, Pinterest-ready styling ideas, and practical room upgrades with a polished editorial eye.
                    </p>

                    <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
                        <Link href="/products" className="btn-primary">
                            Shop Curated Finds
                        </Link>
                        <a href={PINTEREST_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                            View Pinterest
                        </a>
                    </div>

                    <dl className="mt-9 grid grid-cols-3 divide-x divide-espresso/10 rounded-lg border border-espresso/10 bg-white/70 shadow-sm backdrop-blur">
                        {[
                            ['12+', 'finds'],
                            ['3', 'guides'],
                            ['2026', 'edits'],
                        ].map(([value, label]) => (
                            <div key={label} className="px-3 py-4 text-center sm:px-5">
                                <dt className="font-serif text-2xl text-espresso">{value}</dt>
                                <dd className="mt-1 text-[0.65rem] font-semibold uppercase tracking-wider text-espresso-soft">{label}</dd>
                            </div>
                        ))}
                    </dl>
                </motion.div>

                <motion.div
                    className="relative"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    <StorefrontMoodboard />
                </motion.div>
            </div>
        </section>
    );
}

function StorefrontMoodboard() {
    const featured = AMAZON_PRODUCT_IMAGES.slice(0, 5);

    return (
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-espresso/10 bg-ivory p-3 shadow-[0_30px_90px_-50px_rgba(58,46,42,0.55)]">
            <div className="grid h-full grid-cols-5 grid-rows-6 gap-2">
                <div className="relative col-span-3 row-span-4 overflow-hidden rounded-lg bg-cream">
                    <Image
                        src={featured[0]}
                        alt="Amazon home decor feature"
                        fill
                        sizes="(max-width: 768px) 60vw, 360px"
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="relative col-span-2 row-span-2 overflow-hidden rounded-lg bg-cream">
                    <Image src={featured[1]} alt="Amazon home decor find" fill sizes="180px" className="object-cover" />
                </div>
                <div className="relative col-span-2 row-span-2 overflow-hidden rounded-lg bg-cream">
                    <Image src={featured[2]} alt="Amazon bathroom decor detail" fill sizes="180px" className="object-cover" />
                </div>
                <div className="relative col-span-2 row-span-2 overflow-hidden rounded-lg bg-cream">
                    <Image src={featured[3]} alt="Amazon lighting styling piece" fill sizes="180px" className="object-cover" />
                </div>
                <div className="relative col-span-3 row-span-2 overflow-hidden rounded-lg bg-cream">
                    <Image src={featured[4]} alt="Amazon bedding product" fill sizes="280px" className="object-cover" />
                </div>
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-cream/40 bg-cream/95 p-4 shadow-xl backdrop-blur">
                <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-terracotta-dark">
                    Amazon home moodboard
                </p>
                <p className="mt-1 font-serif text-lg leading-snug text-espresso">
                    A custom edit built from Amazon product visuals using the client&apos;s affiliate tag.
                </p>
            </div>
        </div>
    );
}
