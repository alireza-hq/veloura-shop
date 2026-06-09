'use client'

import { Suspense } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { ErrorState } from '@/components/ui/ErrorState';
import { ProductList } from '@/features/products/components/ProductList';
import { useProducts } from '@/features/products/hooks/useProducts';
import { useSearchParams } from 'next/navigation';

const ProductsContent = () => {
  const { data: products, isLoading, error } = useProducts()
  const category = useSearchParams().get('category') ?? 'All'

  if (isLoading) {
    return (
      <main className='page-shell'><div className='page-content'>
        <ProductList products={[]} isLoading />
      </div></main>
    )
  }

  if (error) return <ErrorState error={error} />

  return (
    <main className='page-shell'><div className='page-content'>
      <PageHeader
        eyebrow='The makeup edit'
        title='Explore Veloura'
        description='Discover expressive color, reliable formulas, and effortless essentials for every routine.'
      />
      <ProductList products={products ?? []} initialCategory={category} />
    </div></main>
  )
}

export default function Products() {
  return (
    <Suspense
      fallback={
        <main className='page-shell'><div className='page-content'>
          <ProductList products={[]} isLoading />
        </div></main>
      }
    >
      <ProductsContent />
    </Suspense>
  )
}
