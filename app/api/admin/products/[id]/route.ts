import { NextResponse } from 'next/server';
import { z } from 'zod';
import { updateProduct, deleteProduct } from '@/lib/products';
import { ALL_CATEGORIES } from '@/lib/constants';

const Body = z
  .object({
    asin: z.string().min(1).max(20).optional(),
    title: z.string().min(1).max(200).optional(),
    tagline: z.string().max(300).optional(),
    category: z.enum(ALL_CATEGORIES).optional(),
    price: z.string().max(40).optional(),
    image_url: z.string().max(1000).optional(),
    is_active: z.boolean().optional(),
    position: z.number().int().min(0).max(1_000_000).optional(),
  })
  .strict();

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const id = Number(params.id);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ error: 'Invalid id.' }, { status: 400 });
  }

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
  if (Object.keys(parsed.data).length === 0) {
    return NextResponse.json({ error: 'No fields to update.' }, { status: 400 });
  }

  try {
    const product = await updateProduct(id, parsed.data);
    if (!product) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, product });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update product.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const id = Number(params.id);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ error: 'Invalid id.' }, { status: 400 });
  }

  try {
    const ok = await deleteProduct(id);
    if (!ok) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to delete product.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
