'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function Hero() {
    return (
        <section className="container-wide pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
            <div className="grid gap-12 md:grid-cols-12 md:items-center">
                <motion.div
                    className="md:col-span-7"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <span className="chip">Aesthetic Home & Decor Ideas</span>
                    <h1 className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight text-espresso sm:text-6xl lg:text-7xl">
                        Your home should feel like a <span className="italic text-terracotta-dark">luxury retreat</span>.
                    </h1>
                    <p className="mt-6 max-w-xl text-base leading-relaxed text-espresso-soft sm:text-lg">
                        I’m Zviko, and I spend hours hunting down the prettiest, most aesthetic home upgrades on Amazon so you don’t have to. Think renter-friendly finds that look way more expensive than they are.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                        <Link href="/products" className="btn-primary">
                            Browse the Finds
                        </Link>
                        <Link href="/blog" className="btn-secondary">
                            Read the Blog
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    className="md:col-span-5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_30px_60px_-30px_rgba(58,46,42,0.35)] lg:hover:rotate-1 transition-transform duration-700">
                        <motion.div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80')",
                            }}
                            role="img"
                            aria-label="A warm, neutral-toned living room"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent" />
                        <motion.div
                            className="absolute bottom-5 left-5 right-5 rounded-2xl bg-cream/95 backdrop-blur-md px-5 py-4 shadow-lg"
                            whileHover={{ y: -5 }}
                        >
                            <p className="text-xs uppercase tracking-widest text-terracotta font-semibold">
                                This week’s pick
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
