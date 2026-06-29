import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import { products as seedProducts } from '@/content/products';
import { getAllPosts as getSeedPosts } from './mdx';

let _sql: NeonQueryFunction<false, false> | null = null;
let _migrated = false;

function getSql(): NeonQueryFunction<false, false> {
  if (_sql) return _sql;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      'DATABASE_URL is not set. Add it to .env.local — see .env.local.example for instructions.',
    );
  }
  // The Neon serverless driver in HTTP mode uses fetch — no WebSocket setup
  // needed and works on Node, Edge, and Vercel without any polyfill.
  _sql = neon(url);
  return _sql;
}

/**
 * Idempotent: creates tables if they don't exist, and seeds from
 * `content/products.ts` + `content/blog/*.mdx` on first boot only.
 */
export async function migrate(): Promise<void> {
  if (_migrated) return;
  const sql = getSql();

  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id          BIGSERIAL PRIMARY KEY,
      asin        TEXT NOT NULL,
      title       TEXT NOT NULL,
      tagline     TEXT NOT NULL DEFAULT '',
      category    TEXT NOT NULL CHECK (category IN
                    ('Modern Kitchen Decor Ideas 2026', 'Aesthetic Home Decor Ideas 2026', 'Amazon Bedroom Finds | Cozy + Affordable', 'Modern Living Room Decor Ideas 2026', 'Small Bathroom Organization', 'Modern Home Decor Inspiration', 'Bathroom Counter Styling Ideas', 'Amazon Kitchen Finds | Aesthetic + Affordable', 'Outdoor Decor Ideas | Patio & Garden', 'Spa Bathroom Inspiration at Home', 'Cozy & Minimalist Home Aesthetic')),


      price       TEXT NOT NULL DEFAULT '',
      image_url   TEXT NOT NULL DEFAULT '',
      is_active   BOOLEAN NOT NULL DEFAULT TRUE,
      position    INTEGER NOT NULL DEFAULT 0,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id            BIGSERIAL PRIMARY KEY,
      slug          TEXT NOT NULL UNIQUE,
      title         TEXT NOT NULL,
      description   TEXT NOT NULL DEFAULT '',
      body          TEXT NOT NULL,
      cover_url     TEXT NOT NULL DEFAULT '',
      tags          TEXT[] NOT NULL DEFAULT '{}',
      is_published  BOOLEAN NOT NULL DEFAULT TRUE,
      published_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS media (
      id            BIGSERIAL PRIMARY KEY,
      filename      TEXT NOT NULL,
      original_name TEXT NOT NULL,
      url           TEXT NOT NULL,
      mime_type     TEXT NOT NULL,
      size_bytes    INTEGER NOT NULL,
      width         INTEGER,
      height        INTEGER,
      alt           TEXT NOT NULL DEFAULT '',
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS settings (
      key        TEXT PRIMARY KEY,
      value      TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  // Seed products if empty
  const [{ count: pc }] = (await sql`SELECT COUNT(*)::int AS count FROM products`) as Array<{
    count: number;
  }>;
  if (pc === 0) {
    for (let i = 0; i < seedProducts.length; i++) {
      const p = seedProducts[i];
      await sql`
        INSERT INTO products
          (asin, title, tagline, category, price, image_url, is_active, position)
        VALUES
          (${p.asin}, ${p.title}, ${p.tagline}, ${p.category},
           ${p.price}, ${p.image}, TRUE, ${i})
        ON CONFLICT DO NOTHING
      `;
    }
  }

  // Seed posts if empty
  const [{ count: postc }] = (await sql`SELECT COUNT(*)::int AS count FROM posts`) as Array<{
    count: number;
  }>;
  if (postc === 0) {
    // Reuse the file-based seed at migration time
    const seedPosts = await getSeedPosts();
    // Re-read each post's body. We use a dynamic import to avoid coupling.
    const mdx = await import('./mdx');
    for (const p of seedPosts) {
      const full = await mdx.getPost(p.slug);
      if (!full) continue;
      await sql`
        INSERT INTO posts
          (slug, title, description, body, cover_url, tags, is_published, published_at)
        VALUES
          (${full.slug}, ${full.title}, ${full.description}, ${full.content},
           ${''}, ${(full.tags ?? []) as unknown as string}, TRUE, ${full.date ? new Date(full.date).toISOString() : new Date().toISOString()})
        ON CONFLICT (slug) DO NOTHING
      `;
    }
  }

  // Seed settings defaults if empty
  const [{ count: sc }] = (await sql`SELECT COUNT(*)::int AS count FROM settings`) as Array<{
    count: number;
  }>;
  if (sc === 0) {
    const defaults: Array<[string, string]> = [
      ['site_title', 'PoshNest Finds'],
      ['site_tagline', 'Aesthetic Home & Decor Ideas'],
      ['amazon_tag', process.env.NEXT_PUBLIC_AMAZON_TAG ?? ''],
      ['newsletter_endpoint', process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT ?? ''],
      ['email', 'info@poshnestfinds.com'],
    ];
    for (const [key, value] of defaults) {
      await sql`
          INSERT INTO settings (key, value) VALUES (${key}, ${value})
          ON CONFLICT (key) DO NOTHING
        `;
    }
  }


  _migrated = true;
}

let _ensureDbPromise: Promise<void> | null = null;

/**
 * Call this before any DB-touching operation. Idempotent and memoized — safe
 * to call from many requests; the migration only runs once per process.
 */
export function ensureDb(): Promise<void> {
  if (_migrated) return Promise.resolve();
  if (!_ensureDbPromise) {
    _ensureDbPromise = migrate().catch((err) => {
      _ensureDbPromise = null; // allow retry
      throw err;
    });
  }
  return _ensureDbPromise;
}

/**
 * The exported `sql` is the Neon query function. We expose it lazily — the
 * underlying `neon(url)` only runs the first time a query is executed, after
 * `DATABASE_URL` is guaranteed to be available. A Proxy forwards both the
 * tagged-template call form and the `.transaction()` method to the real
 * query function while TS sees it as `NeonQueryFunction<false, false>`.
 */
export const sql: NeonQueryFunction<false, false> = new Proxy(
  function () { } as unknown as NeonQueryFunction<false, false>,
  {
    get(_target, prop, receiver) {
      const real = getSql();
      const value = Reflect.get(real, prop, real);
      return typeof value === 'function' ? value.bind(real) : value;
    },
    apply(_target, _thisArg, args) {
      const real = getSql();
      return Reflect.apply(real as unknown as Function, real, args);
    },
  },
);
