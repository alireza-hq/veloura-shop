'use client'

import { FaShoppingCart } from 'react-icons/fa'

import { EmptyState } from '@/components/EmptyState'
import { ErrorState } from '@/components/ErrorState'
import { ScreenLayout } from '@/components/layout/ScreenLayout'
import { LoadingState } from '@/components/LoadingState'
import { CategoryList } from '@/features/categories/components/CategoryList'
import { useCategories } from '@/features/categories/hooks/useCategories'
import { routes } from '@/lib/routes'

export default function CategoriesPage() {
  const { data: categories, isLoading, error } = useCategories()

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState error={error} />

  if (!categories || categories.length === 0) {
    return (
      <EmptyState
        icon={FaShoppingCart}
        title='No categories yet'
        buttonText='Browse Products'
        route={routes.products.root}
      >
        We don't have any categories right now. Check back later or browse all
        products.
      </EmptyState>
    )
  }

  return (
    <ScreenLayout>
      <CategoryList categories={categories} />
    </ScreenLayout>
  )
}
