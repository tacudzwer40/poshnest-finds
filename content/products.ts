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
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    asin: 'B0CZ3Y8QF1',
    title: 'Oversized Boucle Accent Chair',
    tagline: 'Cloud-soft texture in a warm cream — the cozy neutral staple.',
    category: 'Aesthetic Home Decor Ideas 2026',
    price: '$329',
    image: 'https://images.unsplash.com/photo-1634712282287-14ed57b9cc89?auto=format&fit=crop&w=1200&q=80',
  },
  {
    asin: 'B08CYBPMJC',
    title: 'Ribbed Bath Towel Set',
    tagline: 'Plush, quick-drying cotton for a spa-like daily routine.',
    category: 'Spa Bathroom Inspiration at Home',
    price: '$54',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    asin: 'B0BDJH3HCJ',
    title: 'Rattan Pendant Light',
    tagline: 'A warm, dappled glow over dining tables and reading nooks.',
    category: 'Aesthetic Home Decor Ideas 2026',
    price: '$72',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80',
  },
  {
    asin: 'B07T89G1N8',
    title: 'French Linen Bedding Set',
    tagline: 'Stonewashed for that perfectly imperfect, crumpled look.',
    category: 'Amazon Bedroom Finds | Cozy + Affordable',
    price: '$129',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    asin: 'B09C4H4VKB',
    title: 'Solid Oak Platform Bed',
    tagline: 'Low-profile frame in white oak — calm, modern, timeless.',
    category: 'Amazon Bedroom Finds | Cozy + Affordable',
    price: '$449',
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    asin: 'B08L8HZD4V',
    title: 'Acacia Wood Cutting Boards',
    tagline: 'Set of three — counter styling made simple and beautiful.',
    category: 'Amazon Kitchen Finds | Aesthetic + Affordable',
    price: '$44',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    asin: 'B07D3NMB73',
    title: 'Matte Stoneware Dinnerware',
    tagline: 'Minimalist glaze in warm sand — the everyday neutral.',
    category: 'Amazon Kitchen Finds | Aesthetic + Affordable',
    price: '$118',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80',
  },
  {
    asin: 'B07X9V8Q4L',
    title: 'Travertine Bathroom Tray',
    tagline: 'An organic edge in creamy stone for your vanity.',
    category: 'Spa Bathroom Inspiration at Home',
    price: '$45',
    image: 'https://images.unsplash.com/photo-1620645607994-db7281db24dd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    asin: 'B0BXCDQRT5',
    title: 'Wavy Minimalist Mirror',
    tagline: 'A playful silhouette that softens any entryway or bedroom.',
    category: 'Amazon Bedroom Finds | Cozy + Affordable',
    price: '$88',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b46a0eb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    asin: 'B09G9D8JP9',
    title: 'Woven Outdoor Lounge Chair',
    tagline: 'Weather-resistant rattan for long afternoons on the patio.',
    category: 'Outdoor Decor Ideas | Patio & Garden',
    price: '$189',
    image: 'https://images.unsplash.com/photo-1599813955627-84bc3ec21980?auto=format&fit=crop&w=1200&q=80',
  },
  {
    asin: 'B0B9B5L9FJ',
    title: 'Smart Ambient Table Lamp',
    tagline: 'Adjustable warmth and brightness from your phone — pure mood lighting.',
    category: 'Modern Home Decor Inspiration',
    price: '$96',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
  },
];

export function productHref(p: Product): string {
  return p.href ?? amazonUrl(p.asin);
}
