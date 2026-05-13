'use client'

import { LoadingState } from '@/components/ui/LoadingState'
import { AdminCategoryForm } from '@/features/admin/categories/components/AdminCategoryForm'
import { useAdminEditCategoryForm } from '@/features/admin/categories/hooks/useAdminEditCategoryForm'
import { useParams } from 'next/navigation'

export default function AdminEditCategoryPage() {
  const { id } = useParams()

  const { form, onSubmit, isSubmitting, isLoading } = useAdminEditCategoryForm(
    Number(id),
  )

  if (isLoading) return <LoadingState />

  return (
    <div>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold text-black dark:text-white'>
          Edit Category
        </h1>
        <p className='mt-1 text-sm text-black/50 dark:text-white/50'>
          Update category details.
        </p>
      </div>

      <AdminCategoryForm
        mode='edit'
        form={form}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
