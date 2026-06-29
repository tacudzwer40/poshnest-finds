'use client';

import { motion } from 'framer-motion';

export function MotionLogo() {
    return (
        <motion.span
            aria-hidden
            whileHover={{ scale: 1.15, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-terracotta/10 ring-1 ring-terracotta/30 transition-shadow duration-300 hover:shadow-[0_0_15px_rgba(180,95,78,0.3)]"
        >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-terracotta">
                <path d="M4 18c2-5 6-8 8-8s6 3 8 8" />
                <path d="M12 10c0-3 2-5 5-5" />
                <circle cx="17" cy="5" r="1.2" fill="currentColor" />
            </svg>
        </motion.span>
    );
}
