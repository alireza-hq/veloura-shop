'use client'

import { ProductCard } from '@/features/products/components/ProductCard';
import { Product } from '@/features/products/types';

type Props = {
  products: Product[]
}

export const WishlistItems = ({ products }: Props) => {
  return (
    <>
      <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </>
  )
}
