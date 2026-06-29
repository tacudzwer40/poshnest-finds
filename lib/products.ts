import 'server-only';
import { ensureDb, sql } from './db';
import { amazonUrl } from './amazon';
import { type Category, type PublicProduct, type Product } from './constants';

export async function getActiveProducts(): Promise<PublicProduct[]> {
  await ensureDb();
  const rows = (await sql`
    SELECT id, asin, title, tagline, category, price, image_url, is_active, position
    FROM products
    WHERE is_active = TRUE
    ORDER BY position ASC, id ASC
  `) as unknown as PublicProduct[];
  return rows;
}

export async function getAllProducts(): Promise<PublicProduct[]> {
  await ensureDb();
  const rows = (await sql`
    SELECT id, asin, title, tagline, category, price, image_url, is_active, position
    FROM products
    ORDER BY position ASC, id ASC
  `) as unknown as PublicProduct[];
  return rows;
}

export async function getProduct(id: number): Promise<PublicProduct | null> {
  await ensureDb();
  const rows = (await sql`
    SELECT id, asin, title, tagline, category, price, image_url, is_active, position
    FROM products WHERE id = ${id} LIMIT 1
  `) as unknown as PublicProduct[];
  return rows[0] ?? null;
}

export async function createProduct(input: Omit<PublicProduct, 'id'>): Promise<PublicProduct> {
  await ensureDb();
  const rows = (await sql`
    INSERT INTO products
      (asin, title, tagline, category, price, image_url, is_active, position)
    VALUES
      (${input.asin}, ${input.title}, ${input.tagline}, ${input.category},
       ${input.price}, ${input.image_url}, ${input.is_active}, ${input.position})
    RETURNING id, asin, title, tagline, category, price, image_url, is_active, position
  `) as unknown as PublicProduct[];
  return rows[0];
}

export async function updateProduct(
  id: number,
  input: Partial<Omit<PublicProduct, 'id'>>,
): Promise<PublicProduct | null> {
  await ensureDb();
  const existing = await getProduct(id);
  if (!existing) return null;
  const next = { ...existing, ...input };
  const rows = (await sql`
    UPDATE products SET
      asin      = ${next.asin},
      title     = ${next.title},
      tagline   = ${next.tagline},
      category  = ${next.category},
      price     = ${next.price},
      image_url = ${next.image_url},
      is_active = ${next.is_active},
      position  = ${next.position},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING id, asin, title, tagline, category, price, image_url, is_active, position
  `) as unknown as PublicProduct[];
  return rows[0] ?? null;
}

export async function deleteProduct(id: number): Promise<boolean> {
  await ensureDb();
  const rows = (await sql`DELETE FROM products WHERE id = ${id} RETURNING id`) as unknown as Array<{
    id: number;
  }>;
  return rows.length > 0;
}
