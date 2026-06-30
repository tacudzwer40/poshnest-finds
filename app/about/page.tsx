import { PINTEREST_URL } from '@/lib/brand';

export const metadata = {
  title: 'About',
  description: 'The story behind PoshNest Finds - curated aesthetic home & decor.',
};

export default function AboutPage() {
  return (
    <article className="container-narrow py-10 sm:py-20">
      <div className="rounded-lg border border-espresso/10 bg-white/75 p-5 shadow-sm backdrop-blur sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-terracotta">About PoshNest Finds</p>
        <h1 className="mt-2 font-serif text-4xl leading-tight text-espresso sm:text-6xl">
          A curated eye for homes that feel warm, elevated, and livable.
        </h1>
        <p className="mt-5 text-lg leading-8 text-espresso-soft">
          I am Zviko, the curator behind PoshNest Finds. I hunt for the prettiest, most aesthetic home upgrades on Amazon so you do not have to.
        </p>
      </div>

      <div className="prose-posh mt-10">
        <p>
          Every home should feel like a luxury retreat, even if you are renting, on a budget, or have zero time for renovations. A well-designed home starts with intention: layout, proportion, color, texture, lighting, and the small details that make a space feel calm.
        </p>

        <h2>What you will find here</h2>
        <ul>
          <li>Aesthetic home decor that is actually affordable</li>
          <li>Easy room upgrades you can do in a weekend, no power tools required</li>
          <li>Amazon finds tested for the expensive-looking factor: texture, lighting, shape, and vibe</li>
          <li>Pinterest-ready inspiration for bathrooms, bedrooms, cozy corners, and more</li>
        </ul>

        <p>
          I share every dupe, styling trick, and hidden gem I find. No gatekeeping. No giant renovation budget. Just pretty spaces that feel like you.
        </p>

        <h2>Let&apos;s Connect</h2>
        <p>
          Pinterest:{' '}
          <a
            href={PINTEREST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-terracotta hover:underline"
          >
            Client Pinterest board
          </a>
        </p>
        <p>
          Email: <a href="mailto:info@poshnestfinds.com" className="text-terracotta hover:underline">info@poshnestfinds.com</a>
        </p>
      </div>
    </article>
  );
}
