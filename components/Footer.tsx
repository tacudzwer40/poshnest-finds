import Link from 'next/link';
import { AMAZON_DISCLOSURE_SHORT } from '@/lib/amazon';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-espresso/10 bg-ivory/50">
      <div className="container-wide py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-serif text-2xl italic text-espresso">PoshNest Finds</p>
          <p className="mt-2 max-w-sm text-sm text-espresso-soft leading-relaxed">
            Aesthetic home & décor ideas — curated finds, styling guides, and
            the small details that make a house feel like home.
          </p>
          <p className="mt-4 text-xs text-espresso-soft italic">
            {AMAZON_DISCLOSURE_SHORT}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-espresso-soft">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className="hover:text-terracotta" href="/products">Featured Finds</Link></li>
            <li><Link className="hover:text-terracotta" href="/blog">Blog</Link></li>
            <li><Link className="hover:text-terracotta" href="/about">About</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-espresso-soft">Follow</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                className="hover:text-terracotta"
                href="https://www.pinterest.com/poshnestfinds/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pinterest
              </a>
            </li>
            <li><Link className="hover:text-terracotta" href="/privacy">Privacy Policy</Link></li>

          </ul>
        </div>
      </div>
      <div className="border-t border-espresso/10 py-5 text-center text-xs text-espresso-soft">
        © {year} PoshNest Finds. All rights reserved.
      </div>
    </footer>
  );
}
