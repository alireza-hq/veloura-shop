'use client'

import { ScreenLayout } from '@/components/layout/ScreenLayout';
import { PageHeader } from '@/components/ui/PageHeader';
import { ErrorState } from '@/components/ui/ErrorState';
import { ProductList } from '@/features/products/components/ProductList';
import { useProducts } from '@/features/products/hooks/useProducts';

export default function Products() {
  const { data: products, isLoading, error } = useProducts()

  if (isLoading) {
    return (
      <ScreenLayout>
        <ProductList products={[]} isLoading />
      </ScreenLayout>
    )
  }

  if (error) return <ErrorState error={error} />

  return (
    <ScreenLayout>
      <PageHeader
        eyebrow='The makeup edit'
        title='Explore Veloura'
        description='Discover expressive color, reliable formulas, and effortless essentials for every routine.'
      />
      <ProductList products={products ?? []} />
    </ScreenLayout>
  )
}
