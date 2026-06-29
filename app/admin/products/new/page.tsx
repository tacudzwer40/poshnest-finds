import Link from 'next/link';
import { ProductForm } from '@/components/admin/ProductForm';

export const metadata = {
  title: 'Admin · New product',
  robots: { index: false, follow: false },
};

export default function NewProductPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <header>
        <p className="text-xs uppercase tracking-[0.25em] text-terracotta">Catalog</p>
        <h1 className="mt-2 font-serif text-3xl text-espresso">New product</h1>
        <p className="mt-1 text-sm text-espresso-soft">
          Add a new item to the catalog. It will appear on the public site as soon as you mark it active.
        </p>
      </header>
      <Link href="/admin/products" className="text-xs text-terracotta hover:underline inline-block">
        ← Back to products
      </Link>
      <ProductForm mode={{ kind: 'create' }} />
    </div>
  );
}