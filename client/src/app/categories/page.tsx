'use client'

import { FaShoppingCart } from 'react-icons/fa';

import { ScreenLayout } from '@/components/layout/ScreenLayout';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { LoadingState } from '@/components/ui/LoadingState';
import { PageHeader } from '@/components/ui/PageHeader';
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
      <PageHeader
        eyebrow='Shop your ritual'
        title='Beauty collections'
        description='Start with the feature, finish, or tool that inspires your next look.'
      />
      <div className='mb-8 grid gap-6 border-y border-black/8 py-6 sm:grid-cols-3 dark:border-white/10'>
        {[
          ['Curated by routine', 'Find the right products without the noise.'],
          ['Made to mix', 'Every collection works beautifully together.'],
          ['Easy to explore', 'Open a collection to see its products instantly.'],
        ].map(([title, description]) => (
          <div key={title}>
            <p className='text-sm font-semibold text-black dark:text-white'>
              {title}
            </p>
            <p className='mt-1 text-sm leading-6 text-black/45 dark:text-white/45'>
              {description}
            </p>
          </div>
        ))}
      </div>
      <CategoryList categories={categories} />
    </ScreenLayout>
  )
}
