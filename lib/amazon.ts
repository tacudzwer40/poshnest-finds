/**
 * Build a tagged Amazon Associates URL for the given ASIN.
 *
 * Centralising this means the only place to change your Associates tag
 * is in the `NEXT_PUBLIC_AMAZON_TAG` env var.
 *
 * Per Amazon Associates program rules, every link to amazon.com must
 * include the tag. The disclosure on /disclosure satisfies the FTC
 * requirement that the relationship be disclosed.
 */
export function amazonUrl(asin: string, opts?: { marketplace?: string }): string {
  const tag = process.env.NEXT_PUBLIC_AMAZON_TAG ?? '';
  const marketplace = opts?.marketplace ?? 'www.amazon.com';
  if (!asin) throw new Error('amazonUrl: asin is required');
  const url = `https://${marketplace}/dp/${asin}/`;
  return tag ? `${url}?tag=${tag}` : url;
}

export const AMAZON_DISCLOSURE_SHORT =
  "As an Amazon Associate I earn from qualifying purchases.";

/** Backwards-compatible helper used by the public product cards. */
export function productHref(p: { asin: string }): string {
  return amazonUrl(p.asin);
}

