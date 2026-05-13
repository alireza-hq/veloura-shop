import { Product } from '@/features/products/types'
import { AdminProductRow } from './AdminProductRow'

type Props = {
  products: Product[]
}

export const AdminProductsTable = ({ products }: Props) => {
  if (products.length === 0) {
    return (
      <div className='rounded-2xl border border-black/10 bg-white p-10 text-center text-sm text-black/50 dark:border-white/10 dark:bg-zinc-950 dark:text-white/50'>
        No products found.
      </div>
    )
  }

  return (
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
            <AdminProductRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
