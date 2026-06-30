import { EmailSignupForm } from './EmailSignupForm';

export function NewsletterSignup() {
  return (
    <section className="relative overflow-hidden rounded-lg border border-cream/10 bg-espresso px-5 py-8 text-cream shadow-[0_24px_80px_-48px_rgba(58,46,42,0.65)] sm:px-10 sm:py-12">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-terracotta/70 to-transparent" aria-hidden />
      <div className="relative grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-terracotta">
            The Nestletter
          </p>
          <h2 className="mt-2 font-serif text-3xl leading-tight text-cream sm:text-4xl">
            New finds, weekly.
            <br />
            <span className="italic text-ivory/80">No spam, ever.</span>
          </h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-cream/75">
            One curated email each Friday: the decor pieces we&apos;re loving,
            styling tips, and the best of Pinterest straight to your inbox.
          </p>
        </div>
        <EmailSignupForm dark />
      </div>
    </section>
  );
}
