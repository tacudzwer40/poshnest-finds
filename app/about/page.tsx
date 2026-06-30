import Link from 'next/link';

export const metadata = {
  title: 'About',
  description: 'The story behind PoshNest Finds — curated aesthetic home & decor.',
};

export default function AboutPage() {
  return (
    <article className="container-narrow py-12 sm:py-20">
      <p className="text-xs uppercase tracking-[0.25em] text-terracotta">About PoshNest Finds</p>
      <h1 className="mt-2 font-serif text-4xl text-espresso sm:text-5xl">
        Welcome to <span className="italic text-terracotta-dark">PoshNest Finds</span>
      </h1>

      <div className="prose-posh mt-10">
        <p>
          I feel every home should feel like a luxury retreat—even if you’re renting, on a budget, or have zero time for renovations. A well-designed home requires intention — understanding how layout, proportion, color, and simple details work out together to give a space its relaxing atmosphere.
        </p>
        <p>
          I’m Zviko, the curator behind PoshNest Finds. I spend hours hunting down the prettiest, most aesthetic home upgrades on Amazon so you don’t have to. Think renter-friendly finds that look way more expensive than they are.
        </p>

        <h2>What you’ll find here</h2>
        <ul>
          <li>Aesthetic home decor that’s actually affordable</li>
          <li>Easy room upgrades you can do in a weekend — no power tools required</li>
          <li>Amazon finds tested for the “expensive-looking” factor: texture, lighting, vibe</li>
          <li>Pinterest-ready inspo for bathrooms, bedrooms, and cozy corners etc</li>
        </ul>

        <p>
          I share every dupe, hack, and hidden gem I find. No gatekeeping. No $2k budget. Just pretty spaces that feel like you.
        </p>
        <p>
          Save a pin, shop the look, and make your nest a little more posh!
        </p>

        <h2>Let&apos;s Connect</h2>
        <p>
          Pinterest:{' '}
          <a
            href="https://www.pinterest.com/poshnestfinds/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-terracotta hover:underline"
          >
            @poshnestfinds
          </a>
        </p>
        <p>
          Email: <a href="mailto:info@poshnestfinds.com" className="text-terracotta hover:underline">info@poshnestfinds.com</a>
        </p>
      </div>
    </article>

  );
}
