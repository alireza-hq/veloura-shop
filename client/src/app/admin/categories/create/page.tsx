'use client'

import { AdminCategoryForm } from '@/features/admin/categories/components/AdminCategoryForm'
import { useAdminCreateCategoryForm } from '@/features/admin/categories/hooks/useAdminCreateCategoryForm'

export default function AdminCreateCategoryPage() {
  const { form, onSubmit, isSubmitting } = useAdminCreateCategoryForm()

  return (
    <div>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold text-black dark:text-white'>
          Add Category
        </h1>
        <p className='mt-1 text-sm text-black/50 dark:text-white/50'>
          Create a new product category.
        </p>
      </div>

      <AdminCategoryForm
        mode='create'
        form={form}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
