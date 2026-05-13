import Link from 'next/link'

import { routes } from '@/lib/routes'

export const AdminProductsHeader = () => {
  return (
    <div className='mb-6 flex items-center justify-between'>
      <div>
        <h1 className='text-3xl font-bold text-black dark:text-white'>
          Products
        </h1>
        <p className='mt-1 text-sm text-black/50 dark:text-white/50'>
          Manage store products.
        </p>
      </div>

      <Link
        href={routes.admin.products.create}
        className='rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-85 dark:bg-white dark:text-black'
      >
        Add Product
      </Link>
    </div>
  )
}
