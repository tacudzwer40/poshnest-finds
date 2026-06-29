import Link from 'next/link';
import { AMAZON_DISCLOSURE_SHORT } from '@/lib/amazon';

export const metadata = {
  title: 'Affiliate Disclosure',
  description:
    'How PoshNest Finds uses affiliate links — written in plain English, FTC-compliant.',
};

export default function DisclosurePage() {
  return (
    <article className="container-narrow py-12 sm:py-20">
      <p className="text-xs uppercase tracking-[0.25em] text-terracotta">The Fine Print</p>
      <h1 className="mt-2 font-serif text-5xl text-espresso">Affiliate Disclosure</h1>
      <p className="mt-4 text-sm italic text-espresso-soft">
        Last updated: {new Date().getFullYear()}
      </p>

      <div className="prose-posh mt-10">
        <p className="text-lg">{AMAZON_DISCLOSURE_SHORT}</p>

        <h2>Amazon Associates Program</h2>
        <p>
          PoshNest Finds is a participant in the Amazon Services LLC Associates
          Program, an affiliate advertising program designed to provide a means
          for sites to earn fees by linking to amazon.com and affiliated sites.
        </p>

        <h2>What this means for you</h2>
        <ul>
          <li>
            Some links on this site are affiliate links. If you click one and
            make a purchase, we may receive a small commission.
          </li>
          <li>
            <strong>You pay nothing extra.</strong> The price you see is the same
            as if you’d gone to Amazon directly.
          </li>
          <li>
            Our editorial recommendations are never paid for, and never
            influenced by affiliate partnerships. If we don’t love a piece, we
            don’t link it — no matter the commission rate.
          </li>
        </ul>

        <h2>Other affiliate programs</h2>
        <p>
          From time to time we may also participate in additional affiliate
          programs (such as ShareASale or boutique décor brands). The same
          principles apply: we only recommend pieces we genuinely love.
        </p>

        <h2>FTC compliance</h2>
        <p>
          This disclosure is provided in accordance with the Federal Trade
          Commission’s 16 CFR Part 255: “Guides Concerning the Use of
          Endorsements and Testimonials in Advertising.”
        </p>

        <h2>Questions?</h2>
        <p>
          We’re happy to clarify anything. Reach out via our{' '}
          <Link href="/about">About page</Link>.
        </p>
      </div>
    </article>
  );
}
