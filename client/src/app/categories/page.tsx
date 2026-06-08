'use client'

import { FaShoppingCart } from 'react-icons/fa';

import { ScreenLayout } from '@/components/layout/ScreenLayout';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { LoadingState } from '@/components/ui/LoadingState';
import { CategoryList } from '@/features/categories/components/CategoryList';
import { useCategories } from '@/features/categories/hooks/useCategories';
import { routes } from '@/lib/routes';

export default function CategoriesPage() {
  const { data: categories, isLoading, error } = useCategories()

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState error={error} />

  if (!categories || categories.length === 0) {
    return (
      <EmptyState
        icon={FaShoppingCart}
        title='No categories yet'
        buttonText='Browse Makeup'
        route={routes.products.root}
      >
        No collections are available right now. Browse all makeup instead.
      </EmptyState>
    )
  }

  return (
    <ScreenLayout>
      <CategoryList categories={categories} />
    </ScreenLayout>
  )
}
