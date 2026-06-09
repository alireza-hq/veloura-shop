'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Edit, Loader2, Trash2 } from 'lucide-react'

import { Category } from '@/features/categories/types'
import { useDeleteCategory } from '@/features/categories/hooks/useDeleteCategory'
import { routes } from '@/lib/routes'

type Props = {
  category: Category
}

export const AdminCategoryRow = ({ category }: Props) => {
  const deleteCategory = useDeleteCategory()

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete "${category.title}"? Products in this category may lose their category.`,
    )

    if (!confirmed) return

    deleteCategory.mutate(category.id)
  }

  return (
    <tr className='border-b border-black/5 last:border-0 dark:border-white/5'>
      <td className='p-4'>
        <div className='flex items-center gap-3'>
          <Image
            src={category.image || '/logo/logo.png'}
            alt={category.title}
            width={40}
            height={40}
            className='h-10 w-10 rounded-lg object-cover'
          />

          <span className='font-medium text-black dark:text-white'>
            {category.title}
          </span>
        </div>
      </td>

      <td className='max-w-md truncate p-4 text-black/60 dark:text-white/60'>
        {category.description || 'No description'}
      </td>

      <td className='p-4'>
        <div className='flex items-center justify-end gap-2'>
          <Link
            href={routes.admin.categories.edit(category.id)}
            className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 text-black/60 transition hover:bg-black hover:text-white dark:border-white/10 dark:text-white/60 dark:hover:bg-white dark:hover:text-black'
            aria-label='Edit category'
          >
            <Edit className='h-4 w-4' />
          </Link>

          <button
            type='button'
            onClick={handleDelete}
            disabled={deleteCategory.isPending}
            className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white'
            aria-label='Delete category'
          >
            {deleteCategory.isPending ? (
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
