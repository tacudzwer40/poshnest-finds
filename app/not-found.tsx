import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-narrow py-24 text-center">
      <p className="font-serif italic text-7xl text-terracotta">404</p>
      <h1 className="mt-4 font-serif text-3xl text-espresso">
        That page is between the cushions.
      </h1>
      <p className="mt-3 text-espresso-soft">
        The link you followed doesn’t lead anywhere — but the front door is right here:
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/" className="btn-primary">Go home</Link>
        <Link href="/blog" className="btn-secondary">Read the blog</Link>
      </div>
    </div>
  );
}
