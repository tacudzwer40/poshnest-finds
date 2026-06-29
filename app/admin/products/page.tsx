import Link from 'next/link';
import { getAllProducts } from '@/lib/products';
import { DeleteAction } from '@/components/admin/DeleteAction';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin · Products',
  robots: { index: false, follow: false },
};

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-terracotta">Catalog</p>
          <h1 className="mt-2 font-serif text-3xl text-espresso">Products</h1>
          <p className="mt-1 text-sm text-espresso-soft">
            {products.length} {products.length === 1 ? 'item' : 'items'} in the catalog.
          </p>
        </div>
        <Link href="/admin/products/new" className="btn-primary !py-1.5 !px-4 text-xs">
          + New product
        </Link>
      </header>

      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="w-16"></th>
                <th>ASIN</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th className="w-8">Pos</th>
                <th className="text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-espresso-soft italic">
                    No products yet. <Link href="/admin/products/new" className="text-terracotta hover:underline">Create the first one</Link>.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id}>
                    <td>
                      {p.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.image_url}
                          alt=""
                          className="h-10 w-10 rounded-lg object-cover border border-espresso/10"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-ivory border border-espresso/10" />
                      )}
                    </td>
                    <td className="font-mono text-xs">{p.asin}</td>
                    <td className="font-medium text-espresso">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="hover:text-terracotta-dark"
                      >
                        {p.title}
                      </Link>
                      {p.tagline && (
                        <span className="block text-xs text-espresso-soft font-normal mt-0.5 truncate max-w-md">
                          {p.tagline}
                        </span>
                      )}
                    </td>
                    <td>
                      <span className="chip text-[10px]">{p.category}</span>
                    </td>
                    <td className="text-espresso-soft">{p.price || '—'}</td>
                    <td>
                      <span
                        className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full
                                    ${
                                      p.is_active
                                        ? 'bg-sage/15 text-sage-dark'
                                        : 'bg-ivory text-espresso-soft'
                                    }`}
                      >
                        {p.is_active ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="text-espresso-soft">{p.position}</td>
                    <td>
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/products/${p.id}`}
                          className="text-xs text-espresso-soft hover:text-espresso"
                        >
                          Edit
                        </Link>
                        <DeleteAction
                          endpoint={`/api/admin/products/${p.id}`}
                          title={`Delete "${p.title}"?`}
                          body="This will remove the product from the catalog. This cannot be undone."
                        >
                          <span className="text-xs text-terracotta-dark hover:text-terracotta">
                            Delete
                          </span>
                        </DeleteAction>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}