/**
 * Client-safe constants shared between server and client components.
 * The data-access lib files are server-only, so any constant used by
 * `'use client'` admin forms must be duplicated here.
 */

export const ALL_CATEGORIES = [
  'Modern Kitchen Decor Ideas 2026',
  'Aesthetic Home Decor Ideas 2026',
  'Amazon Bedroom Finds | Cozy + Affordable',
  'Modern Living Room Decor Ideas 2026',
  'Small Bathroom Organization',
  'Modern Home Decor Inspiration',
  'Bathroom Counter Styling Ideas',
  'Amazon Kitchen Finds | Aesthetic + Affordable',
  'Outdoor Decor Ideas | Patio & Garden',
  'Spa Bathroom Inspiration at Home',
  'Cozy & Minimalist Home Aesthetic',
] as const;



export type Category = (typeof ALL_CATEGORIES)[number];

export type Product = {
  id: number;
  asin: string;
  title: string;
  tagline: string;
  category: Category;
  price: string;
  image_url: string;
  is_active: boolean;
  position: number;
  created_at: string;
  updated_at: string;
};

export type PublicProduct = Omit<Product, 'created_at' | 'updated_at'>;

