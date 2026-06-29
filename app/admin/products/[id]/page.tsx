import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/products';
import { ProductForm } from '@/components/admin/ProductForm';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin · Edit product',
  robots: { index: false, follow: false },
};

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (!Number.isFinite(id) || id <= 0) notFound();
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.25em] text-terracotta">Catalog</p>
        <h1 className="mt-2 font-serif text-3xl text-espresso">{product.title}</h1>
        <p className="mt-1 text-sm text-espresso-soft font-mono">{product.asin}</p>
      </header>
      <Link href="/admin/products" className="text-xs text-terracotta hover:underline inline-block">
        ← Back to products
      </Link>
      <ProductForm mode={{ kind: 'edit', id }} initial={product} />
    </div>
  );
}