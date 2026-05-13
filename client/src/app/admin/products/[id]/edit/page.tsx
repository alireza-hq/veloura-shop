'use client'

import { useParams } from 'next/navigation'

import { LoadingState } from '@/components/ui/LoadingState'
import { AdminProductForm } from '@/features/admin/products/components/AdminProductForm'
import { useAdminEditProductForm } from '@/features/admin/products/hooks/useAdminEditProductForm'
import { useCategories } from '@/features/categories/hooks/useCategories'

export default function AdminEditProductPage() {
  const { id } = useParams()

  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories()

  const {
    form,
    onSubmit,
    isSubmitting,
    isLoading: productLoading,
  } = useAdminEditProductForm(Number(id))

  if (categoriesLoading || productLoading) return <LoadingState />

  return (
    <div>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold text-black dark:text-white'>
          Edit Product
        </h1>
        <p className='mt-1 text-sm text-black/50 dark:text-white/50'>
          Update product details.
        </p>
      </div>

      <AdminProductForm
        mode='edit'
        form={form}
        categories={categories}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
