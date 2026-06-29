import Link from 'next/link';

type Variant = 'banner' | 'inline';

export function AffiliateDisclosure({ variant = 'inline' }: { variant?: Variant }) {
  const base =
    'rounded-xl border border-terracotta/30 bg-terracotta/5 text-espresso-soft';
  const sizing = variant === 'banner' ? 'px-5 py-4' : 'px-4 py-3 text-sm';
  return (
    <aside
      role="note"
      aria-label="Affiliate disclosure"
      className={`${base} ${sizing}`}
    >
      <p className="leading-relaxed">
        <strong className="font-medium text-espresso">Disclosure:</strong>{' '}
        PoshNest Finds is a participant in the Amazon Services LLC Associates
        Program. Some links on this page are affiliate links — we may earn a
        small commission at no extra cost to you.{' '}
        <Link href="/disclosure" className="underline underline-offset-2 hover:text-terracotta">
          Read full disclosure
        </Link>
        .
      </p>
    </aside>
  );
}
