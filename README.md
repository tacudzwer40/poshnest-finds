# PoshNest Finds

An affiliate marketing site for the **PoshNest Finds** Pinterest account (*Aesthetic Home & Decor Ideas*). Built with Next.js 14, TypeScript, and Tailwind CSS.

## Quick start

```bash
cd poshnest-finds
cp .env.local.example .env.local      # then edit with your real values
npm install
npm run dev                           # http://localhost:3000
```

## Configuration

All runtime config lives in `.env.local` (use the values in `.env.local.example` as a template):

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_AMAZON_TAG` | ✅ for live site | Your Amazon Associates tag (the bit after `?tag=`). All product links route through this. |
| `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` | optional | POST endpoint that accepts `{ "email": "..." }` JSON. Leave blank to show "coming soon". |
| `NEXT_PUBLIC_ANALYTICS_PROVIDER` | optional | `plausible` or `ga4` — otherwise analytics is disabled. |
| `NEXT_PUBLIC_ANALYTICS_ID` | optional | The Plausible domain or GA4 measurement ID. |
| `NEXT_PUBLIC_SITE_URL` | optional | Used by sitemap.xml + OpenGraph. Defaults to `http://localhost:3000`. |

## Amazon Associates checklist (read before going live)

1. **Sign up** at [affiliate-program.amazon.com](https://affiliate-program.amazon.com) if you haven't already.
2. **Get your tag.** It's on the Associates homepage — looks like `yourname-20`.
3. **Set `NEXT_PUBLIC_AMAZON_TAG`** in `.env.local` (locally) and in your hosting provider's environment (in production).
4. **Verify every product ASIN.** Each `asin` field in `content/products.ts` must be enrolled in your Associates account, otherwise you won't earn commissions and Amazon can flag your account. The seed ASINs in this repo are **placeholders** — replace them with real ones you've tested.
5. **Replace placeholder images** with real Amazon product images you have rights to link.
6. **Check pricing.** Amazon's Associates Program Terms forbid showing real-time prices without using the Product Advertising API — the `price` field here is intended as a manual editorial label, not a live price feed.

## How to add a new product

Edit `content/products.ts` and add an entry:

```ts
{
  asin: 'B0XXXXXXXX',
  title: 'Product Name',
  tagline: 'One-line description.',
  category: 'Living Room', // or Bedroom / Kitchen / Lighting / Decor
  price: '$XX',
  image: 'https://m.media-amazon.com/images/...',
}
```

## How to add a new blog post

Create a new `.mdx` file under `content/blog/`, e.g. `content/blog/my-new-post.mdx`:

```mdx
---
title: "Your Post Title"
description: "A 1-2 sentence summary used for SEO and the index card."
date: "2026-06-18"
tags: ["Living Room", "Styling"]
---

Intro paragraph.

## Section heading

Body text with **bold**, *italic*, and [links](https://example.com).

- Bullet one
- Bullet two

<Product asin="B0XXXXXXXX" />

> A pull-quote in blockquote form.
```

Supported Markdown: `##` `###` headings, paragraphs, `-` lists, `>` blockquotes, `**bold**`, `*italic*`, `[text](url)`. The `<Product asin="..." />` tag resolves against `content/products.ts` — if the ASIN is in the catalog, the full product card renders with its image; otherwise a minimal card uses any inline `title` / `tagline` / `category` / `price` you provide on the tag.

The post appears immediately at `/blog` and at `/blog/<slug>` on next build (or live, in dev mode).

## Deploying

The simplest path is Vercel (free tier is plenty):

1. Push this folder to a GitHub repo.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Add the env vars from `.env.local` to the Vercel project settings.
4. Deploy.

Other Node hosts work too — the output of `npm run build` is a standard Next.js app.

## Project structure

```
app/                  # Next.js App Router pages
  layout.tsx          # Root layout (fonts, Navbar, Footer)
  page.tsx            # Home
  products/page.tsx   # Featured products grid
  blog/               # Blog index + dynamic [slug]
  about/page.tsx
  disclosure/page.tsx
  sitemap.ts          # Auto-generated sitemap.xml
  robots.ts           # robots.txt
components/           # Navbar, Footer, ProductCard, PostCard, NewsletterSignup, EmailSignupForm, AffiliateDisclosure
content/
  blog/               # .mdx posts
  products.ts         # Seed product catalog
lib/
  amazon.ts           # amazonUrl(asin) — single source of truth for affiliate links
  mdx.ts              # Read posts + parse frontmatter
  mdx-render.tsx      # Lightweight MDX-style renderer (no @next/mdx needed)
public/               # Static assets
```

## License & disclosure

This site contains affiliate links. Every page that links to Amazon displays an affiliate disclosure. See `/disclosure` for the full FTC-compliant text.
