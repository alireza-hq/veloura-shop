'use client'

import { Suspense } from 'react';
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
      <section className='mb-14 grid gap-8 border-b border-black/8 pb-10 lg:grid-cols-[1fr_auto] lg:items-end dark:border-white/10'>
        <div>
          <p className='text-xs font-semibold tracking-[0.22em] text-rose-900/55 uppercase dark:text-rose-100/50'>
            The product library
          </p>
          <h1 className='mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.055em] text-black sm:text-7xl dark:text-white'>
            Find your next everyday favorite.
          </h1>
          <p className='mt-5 max-w-xl text-base leading-7 text-black/48 dark:text-white/48'>
            Focused formulas, expressive color, and useful essentials without
            the endless scroll.
          </p>
        </div>
        <p className='text-sm text-black/42 dark:text-white/42'>
          {products?.length ?? 0} products in the edit
        </p>
      </section>
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
