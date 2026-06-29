import { EmailSignupForm } from './EmailSignupForm';

export function NewsletterSignup() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-espresso text-cream px-6 sm:px-10 py-10 sm:py-14">
      <div
        aria-hidden
        className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-terracotta/30 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-sage/20 blur-3xl"
      />
      <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-terracotta">
            The Nestletter
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-cream leading-tight">
            New finds, weekly.
            <br />
            <span className="italic text-ivory/80">No spam, ever.</span>
          </h2>
          <p className="mt-3 text-sm text-cream/75 max-w-md">
            One curated email each Friday: the décor pieces we’re loving, styling
            tips, and the best of Pinterest — straight to your inbox.
          </p>
        </div>
        <EmailSignupForm dark />
      </div>
    </section>
  );
}
