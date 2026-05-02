'use client'

import { useCartStore } from '../store/useCartStore'
import { CartItemCard } from './CartItemCard'

export const CartItems = () => {
  const items = useCartStore((state) => state.items)

  return (
    <>
      <h1 className={'mb-8 text-3xl font-bold text-black dark:text-white'}>
        Cart Items
      </h1>

      <div className='hidden items-center gap-4 p-2 text-xs font-semibold tracking-wider text-black/40 uppercase sm:grid sm:grid-cols-[2fr_1fr_1fr_1fr] sm:gap-4 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-8 dark:text-white/40'>
        <div>Product</div>
        <div className='text-center'>Price</div>
        <div className='text-center'>Qty</div>
        <div className='text-center'>Total</div>
      </div>

      <div className='space-y-3'>
        {items.map((item) => (
          <CartItemCard key={item.productId} item={item} />
        ))}
      </div>
    </>
  )
}
