import Link from 'next/link';

import { routes } from '@/lib/routes';

import { useCartStore } from '../store/useCartStore';

export const CartFooter = () => {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className='mt-10 flex flex-col items-end justify-between gap-6 border-t border-black/10 pt-8 sm:flex-row sm:items-center dark:border-white/10'>
      <div className='text-right'>
        <p className='mb-1 text-sm text-black/50 dark:text-white/50'>Total</p>
        <p className='text-3xl font-bold text-black dark:text-white'>
          ${total.toFixed(2)}
        </p>
      </div>

      <div className='flex gap-3'>
        <button
          onClick={() => clearCart()}
          className='rounded-full border border-black/10 bg-white px-6 py-2.5 text-sm font-medium text-black shadow-xs transition hover:opacity-80 hover:shadow-sm active:opacity-75 dark:border-white/15 dark:bg-black dark:text-white'
        >
          Clear Cart
        </button>
        <Link
          href={routes.checkout}
          className='rounded-full bg-black px-8 py-2.5 text-sm font-medium text-white shadow-2xs transition hover:opacity-80 hover:shadow-xs active:opacity-75 dark:bg-white dark:text-black'
        >
          Checkout
        </Link>
      </div>
    </div>
  )
}
