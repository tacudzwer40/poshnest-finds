import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getAllProducts, createProduct } from '@/lib/products';
import { ALL_CATEGORIES } from '@/lib/constants';

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to load products.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

const Body = z.object({
  asin: z.string().min(1).max(20),
  title: z.string().min(1).max(200),
  tagline: z.string().max(300).default(''),
  category: z.enum(ALL_CATEGORIES),
  price: z.string().max(40).default(''),
  image_url: z.string().max(1000).default(''),
  is_active: z.boolean().default(true),
  position: z.number().int().min(0).max(1_000_000).default(0),
});

export async function POST(req: Request) {
  let parsed;
  try {
    const body = await req.json();
    parsed = Body.safeParse(body);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input.' }, { status: 400 });
  }

  try {
    const product = await createProduct(parsed.data);
    return NextResponse.json({ ok: true, product });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create product.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
