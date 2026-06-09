'use client'

import { useCartStore } from '../store/useCartStore';
import { CartItemCard } from './CartItemCard';

export const CartItemList = () => {
  const items = useCartStore((state) => state.items)

  return (
    <section>
      <div className='mb-3 hidden items-center gap-4 border-b border-black/8 px-2 pb-3 text-xs font-semibold tracking-wider text-black/35 uppercase sm:grid sm:grid-cols-[2fr_1fr_1fr] dark:border-white/10 dark:text-white/35'>
        <div>Your products</div>
        <div className='text-center'>Quantity</div>
        <div className='text-right'>Subtotal</div>
      </div>

      <div className='space-y-3'>
        {items.map((item) => (
          <CartItemCard key={item.productId} item={item} />
        ))}
      </div>
    </section>
  )
}
