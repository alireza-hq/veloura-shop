'use client'

import { LoadingState } from '@/components/ui/LoadingState'
import { AdminProductForm } from '@/features/admin/products/components/AdminProductForm'
import { useAdminCreateProductForm } from '@/features/admin/products/hooks/useAdminCreateProductForm'
import { useCategories } from '@/features/categories/hooks/useCategories'

export default function AdminCreateProductPage() {
  const { data: categories = [], isLoading } = useCategories()

  const { form, onSubmit, isSubmitting } = useAdminCreateProductForm()

  if (isLoading) return <LoadingState />

  return (
    <div>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold text-black dark:text-white'>
          Add Product
        </h1>
        <p className='mt-1 text-sm text-black/50 dark:text-white/50'>
          Create a new product for your store.
        </p>
      </div>

      <AdminProductForm
        mode='create'
        form={form}
        categories={categories}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
