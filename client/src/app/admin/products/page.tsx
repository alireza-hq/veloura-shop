'use client'

import { LoadingState } from '@/components/ui/LoadingState'
import { useProducts } from '@/features/products/hooks/useProducts'

export default function AdminProductsPage() {
  const { data: products = [], isLoading } = useProducts()

  if (isLoading) return <LoadingState />

  return (
    <div>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-black dark:text-white'>
            Products
          </h1>
          <p className='mt-1 text-sm text-black/50 dark:text-white/50'>
            Manage store products.
          </p>
        </div>

        <button className='rounded-xl bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black'>
          Add Product
        </button>
      </div>

      <div className='overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-zinc-950'>
        <table className='w-full text-sm'>
          <thead className='border-b border-black/10 text-left text-black/50 dark:border-white/10 dark:text-white/50'>
            <tr>
              <th className='p-4'>Product</th>
              <th className='p-4'>Category</th>
              <th className='p-4'>Price</th>
              <th className='p-4'>Stock</th>
              <th className='p-4 text-right'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className='border-b border-black/5 last:border-0 dark:border-white/5'
              >
                <td className='p-4'>
                  <div className='flex items-center gap-3'>
                    <img
                      src={product.image}
                      alt={product.name}
                      className='h-10 w-10 rounded-lg object-cover'
                    />
                    <span className='font-medium text-black dark:text-white'>
                      {product.name}
                    </span>
                  </div>
                </td>

                <td className='p-4 text-black/60 dark:text-white/60'>
                  {product.category.title}
                </td>

                <td className='p-4 text-black/60 dark:text-white/60'>
                  ${product.price.toFixed(2)}
                </td>

                <td className='p-4 text-black/60 dark:text-white/60'>
                  {product.stock}
                </td>

                <td className='p-4 text-right'>
                  <button className='text-sm text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white'>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
