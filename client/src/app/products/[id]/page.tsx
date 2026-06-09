'use client'

import { notFound, useParams } from 'next/navigation';

import { ErrorState } from '@/components/ui/ErrorState';
import { LoadingState } from '@/components/ui/LoadingState';
import { ProductDetails } from '@/features/products/components/ProductDetails';
import { ProductReviews } from '@/features/products/components/ProductReviews';
import { useProduct } from '@/features/products/hooks/useProduct';

export default function ProductPage() {
  const { id } = useParams()
  const { data: product, isLoading, error } = useProduct(Number(id))

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState error={error} />
  if (!product) return notFound()

  return (
    <main className='page-shell'>
      <ProductDetails product={product} />
      <ProductReviews productId={product.id} />
    </main>
  )
}
