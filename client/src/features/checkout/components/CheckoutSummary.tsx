'use client'

import { useCartStore } from '@/features/cart/store/useCartStore'

export const CheckoutSummary = () => {
  const items = useCartStore((state) => state.items)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className='lg:col-span-1'>
      <div className='sticky top-8 rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-zinc-900'>
        <h3 className='mb-4 text-lg font-semibold text-black dark:text-white'>
          Order Summary
        </h3>

        <div className='space-y-3 border-b border-black/5 pb-4 dark:border-white/5'>
          {items.map((item) => (
            <div key={item.productId} className='flex justify-between text-sm'>
              <span className='text-black/70 dark:text-white/70'>
                {item.name} × {item.quantity}
              </span>
              <span className='font-medium text-black dark:text-white'>
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className='mt-4 flex items-center justify-between text-lg font-bold text-black dark:text-white'>
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
