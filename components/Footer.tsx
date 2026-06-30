import Link from 'next/link';
import { AMAZON_DISCLOSURE_SHORT } from '@/lib/amazon';
import { PINTEREST_URL } from '@/lib/brand';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-cream/10 bg-espresso text-cream">
      <div className="container-wide grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-serif text-2xl italic text-cream">PoshNest Finds</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-cream/70">
            Aesthetic home decor ideas, curated finds, styling guides, and the
            small details that make a house feel like home.
          </p>
          <p className="mt-4 text-xs italic text-cream/60">
            {AMAZON_DISCLOSURE_SHORT}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-cream/50">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className="text-cream/75 hover:text-terracotta" href="/products">Featured Finds</Link></li>
            <li><Link className="text-cream/75 hover:text-terracotta" href="/blog">Blog</Link></li>
            <li><Link className="text-cream/75 hover:text-terracotta" href="/about">About</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-cream/50">Follow</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                className="text-cream/75 hover:text-terracotta"
                href={PINTEREST_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Pinterest
              </a>
            </li>
            <li><Link className="text-cream/75 hover:text-terracotta" href="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/50">
        &copy; {year} PoshNest Finds. All rights reserved.
      </div>
    </footer>
  );
}
