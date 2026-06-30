import { amazonUrl } from '@/lib/amazon';

export type Category =
  | 'Modern Kitchen Decor Ideas 2026'
  | 'Aesthetic Home Decor Ideas 2026'
  | 'Amazon Bedroom Finds | Cozy + Affordable'
  | 'Modern Living Room Decor Ideas 2026'
  | 'Small Bathroom Organization'
  | 'Modern Home Decor Inspiration'
  | 'Bathroom Counter Styling Ideas'
  | 'Amazon Kitchen Finds | Aesthetic + Affordable'
  | 'Outdoor Decor Ideas | Patio & Garden'
  | 'Spa Bathroom Inspiration at Home'
  | 'Cozy & Minimalist Home Aesthetic';




export type Product = {
  asin: string;
  title: string;
  tagline: string;
  category: Category;
  price: string;
  image: string;
  href?: string; // optional override; defaults to amazonUrl(asin)
};

/**
 * Seed product list.
 *
 * ⚠️ Before going live:
 *   1. Sign in to Amazon Associates and add each ASIN to your Store.
 *   2. Replace these placeholder images with the Amazon image you prefer
 *      (right-click any Amazon product image → Copy image address).
 *   3. Update `price` with current list price (the site does not pull live
 *      pricing — Amazon's terms forbid it without the Product Advertising API).
 *   4. Confirm your NEXT_PUBLIC_AMAZON_TAG is set in .env.local.
 */
export const products: Product[] = [
  {
    asin: 'B08SBYPF14',
    title: 'Washed Linen Curtain Panel',
    tagline: 'Soft, light-filtering drape for a lived-in, airy feel.',
    category: 'Aesthetic Home Decor Ideas 2026',
    price: '$38',
    image: '/products/linen-curtain.png',
  },
  {
    asin: 'B0CZ3Y8QF1',
    title: 'Oversized Boucle Accent Chair',
    tagline: 'Cloud-soft texture in a warm cream — the cozy neutral staple.',
    category: 'Aesthetic Home Decor Ideas 2026',
    price: '$329',
    image: '/products/boucle-chair.png',
  },
  {
    asin: 'B08CYBPMJC',
    title: 'Ribbed Bath Towel Set',
    tagline: 'Plush, quick-drying cotton for a spa-like daily routine.',
    category: 'Spa Bathroom Inspiration at Home',
    price: '$54',
    image: '/products/towel-set.png',
  },
  {
    asin: 'B0BDJH3HCJ',
    title: 'Rattan Pendant Light',
    tagline: 'A warm, dappled glow over dining tables and reading nooks.',
    category: 'Aesthetic Home Decor Ideas 2026',
    price: '$72',
    image: '/products/rattan-pendant.png',
  },
  {
    asin: 'B07T89G1N8',
    title: 'French Linen Bedding Set',
    tagline: 'Stonewashed for that perfectly imperfect, crumpled look.',
    category: 'Amazon Bedroom Finds | Cozy + Affordable',
    price: '$129',
    image: '/products/linen-bedding.png',
  },
  {
    asin: 'B09C4H4VKB',
    title: 'Solid Oak Platform Bed',
    tagline: 'Low-profile frame in white oak — calm, modern, timeless.',
    category: 'Amazon Bedroom Finds | Cozy + Affordable',
    price: '$449',
    image: '/products/oak-bed.png',
  },
  {
    asin: 'B08L8HZD4V',
    title: 'Acacia Wood Cutting Boards',
    tagline: 'Set of three — counter styling made simple and beautiful.',
    category: 'Amazon Kitchen Finds | Aesthetic + Affordable',
    price: '$44',
    image: '/products/cutting-boards.png',
  },
  {
    asin: 'B07D3NMB73',
    title: 'Matte Stoneware Dinnerware',
    tagline: 'Minimalist glaze in warm sand — the everyday neutral.',
    category: 'Amazon Kitchen Finds | Aesthetic + Affordable',
    price: '$118',
    image: '/products/stoneware.png',
  },
  {
    asin: 'B07X9V8Q4L',
    title: 'Travertine Bathroom Tray',
    tagline: 'An organic edge in creamy stone for your vanity.',
    category: 'Spa Bathroom Inspiration at Home',
    price: '$45',
    image: '/products/travertine-tray.png',
  },
  {
    asin: 'B0BXCDQRT5',
    title: 'Wavy Minimalist Mirror',
    tagline: 'A playful silhouette that softens any entryway or bedroom.',
    category: 'Amazon Bedroom Finds | Cozy + Affordable',
    price: '$88',
    image: '/products/wavy-mirror.png',
  },
  {
    asin: 'B09G9D8JP9',
    title: 'Woven Outdoor Lounge Chair',
    tagline: 'Weather-resistant rattan for long afternoons on the patio.',
    category: 'Outdoor Decor Ideas | Patio & Garden',
    price: '$189',
    image: '/products/outdoor-chair.png',
  },
  {
    asin: 'B0B9B5L9FJ',
    title: 'Smart Ambient Table Lamp',
    tagline: 'Adjustable warmth and brightness from your phone — pure mood lighting.',
    category: 'Modern Home Decor Inspiration',
    price: '$96',
    image: '/products/ambient-lamp.png',
  },
];

export function productHref(p: Product): string {
  return p.href ?? amazonUrl(p.asin);
}
