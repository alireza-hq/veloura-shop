'use client'

import Link from 'next/link'
import { Edit, ExternalLink, Loader2, Trash2 } from 'lucide-react'

import { Product } from '@/features/products/types'
import { useDeleteProduct } from '@/features/products/hooks/useDeleteProduct'
import { routes } from '@/lib/routes'

type Props = {
  product: Product
}

export const AdminProductRow = ({ product }: Props) => {
  const deleteProduct = useDeleteProduct()

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete "${product.name}"? This action cannot be undone.`,
    )

    if (!confirmed) return

    deleteProduct.mutate(product.id)
  }

  return (
    <tr className='border-b border-black/5 last:border-0 dark:border-white/5'>
      <td className='p-4'>
        <Link
          href={routes.products.product(product.id)}
          className='group flex items-center gap-3'
        >
          <img
            src={product.image}
            alt={product.name}
            className='h-10 w-10 rounded-lg object-cover'
          />

          <div className='min-w-0'>
            <span className='block truncate font-medium text-black group-hover:underline dark:text-white'>
              {product.name}
            </span>

            <span className='mt-0.5 flex items-center gap-1 text-xs text-black/40 dark:text-white/40'>
              View product
              <ExternalLink className='h-3 w-3' />
            </span>
          </div>
        </Link>
      </td>

      <td className='p-4 text-black/60 dark:text-white/60'>
        {product.category.title}
      </td>

      <td className='p-4 text-black/60 dark:text-white/60'>
        ${product.price.toFixed(2)}
      </td>

      <td className='p-4 text-black/60 dark:text-white/60'>{product.stock}</td>

      <td className='p-4'>
        <div className='flex items-center justify-end gap-2'>
          <Link
            href={routes.admin.products.edit(product.id)}
            className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 text-black/60 transition hover:bg-black hover:text-white dark:border-white/10 dark:text-white/60 dark:hover:bg-white dark:hover:text-black'
            aria-label='Edit product'
          >
            <Edit className='h-4 w-4' />
          </Link>

          <button
            type='button'
            onClick={handleDelete}
            disabled={deleteProduct.isPending}
            className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white'
            aria-label='Delete product'
          >
            {deleteProduct.isPending ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <Trash2 className='h-4 w-4' />
            )}
          </button>
        </div>
      </td>
    </tr>
  )
}
