'use client'

import { FaShoppingCart } from 'react-icons/fa'

import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { LoadingState } from '@/components/ui/LoadingState'
import { PageHeader } from '@/components/ui/PageHeader'
import { CategoryList } from '@/features/categories/components/CategoryList'
import { useCategories } from '@/features/categories/hooks/useCategories'
import { routes } from '@/lib/routes'

export default function CollectionsPage() {
  const { data: categories, isLoading, error } = useCategories()

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState error={error} />

  if (!categories?.length) {
    return (
      <EmptyState
        icon={FaShoppingCart}
        title='No collections yet'
        buttonText='Browse products'
        route={routes.products.root}
      >
        No collections are available right now.
      </EmptyState>
    )
  }

  return (
    <main className='page-shell'>
      <div className='page-content'>
        <PageHeader
          eyebrow='Shop with intention'
          title='Collections for every routine'
          description='Follow a finish, feature, or feeling into a focused edit of products that work beautifully together.'
        />
        <CategoryList categories={categories} />
      </div>
    </main>
  )
}
