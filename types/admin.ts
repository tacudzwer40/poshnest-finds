/**
 * Client-side type mirrors for the data the admin forms exchange with the API.
 * Mirrors the relevant fields from lib/products.ts, lib/posts.ts, lib/media.ts,
 * lib/settings.ts without pulling in `server-only` dependencies.
 */
import type { Category } from '@/lib/constants';

export type ProductInput = {
  id?: number;
  asin: string;
  title: string;
  tagline: string;
  category: Category;
  price: string;
  image_url: string;
  is_active: boolean;
  position: number;
};

export type PostInput = {
  id?: number;
  slug: string;
  title: string;
  description: string;
  body: string;
  cover_url: string;
  tags: string[];
  is_published: boolean;
};

export type SettingsInput = {
  site_title: string;
  site_tagline: string;
  amazon_tag: string;
  newsletter_endpoint: string;
  disclosure_text: string;
};

export type MediaItem = {
  id: number;
  filename: string;
  original_name: string;
  url: string;
  mime_type: string;
  size_bytes: number;
  width: number | null;
  height: number | null;
  alt: string;
  created_at: string;
};
