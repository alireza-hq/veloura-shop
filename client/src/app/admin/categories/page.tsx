'use client'

import { LoadingState } from '@/components/ui/LoadingState'
import { useCategories } from '@/features/categories/hooks/useCategories'

import { AdminCategoriesHeader } from '@/features/admin/categories/components/AdminCategoriesHeader'
import { AdminCategoriesTable } from '@/features/admin/categories/components/AdminCategoriesTable'

export default function AdminCategoriesPage() {
  const { data: categories = [], isLoading } = useCategories()

  if (isLoading) return <LoadingState />

  return (
    <div>
      <AdminCategoriesHeader />

      <AdminCategoriesTable categories={categories} />
    </div>
  )
}
