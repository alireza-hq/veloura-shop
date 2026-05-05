'use client'

import { ScreenLayout } from '@/components/layout/ScreenLayout'
import { ErrorState } from '@/components/ui/ErrorState'
import { ProductList } from '@/features/products/components/ProductList'
import { useProducts } from '@/features/products/hooks/useProducts'

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
      {/* <h1 className='mb-10 border-y-2 border-black px-4 py-4 text-center text-3xl font-bold text-black dark:text-white'> */}
      <h1 className='mb-10 text-3xl font-bold text-black dark:text-white'>
        Explore Products
      </h1>
      <ProductList products={products ?? []} />
    </ScreenLayout>
  )
}
