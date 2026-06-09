import Link from 'next/link'

import { routes } from '@/lib/routes'

import { useCart } from '../hooks/useCart'

export const CartFooter = () => {
  const { items, clearCart, isPending } = useCart()

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className='mt-10 flex flex-col gap-6 rounded-3xl border border-black/8 bg-white/65 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7 dark:border-white/10 dark:bg-white/4'>
      <div className='text-right'>
        <p className='mb-1 text-sm text-black/50 dark:text-white/50'>Total</p>
        <p className='text-3xl font-bold text-black dark:text-white'>
          ${total.toFixed(2)}
        </p>
      </div>

      <div className='grid w-full grid-cols-2 gap-3 sm:w-auto'>
        <button
          type='button'
          disabled={isPending}
          onClick={() => clearCart()}
          className='rounded-full border border-black/10 bg-white px-6 py-2.5 text-sm font-medium text-black shadow-xs transition hover:opacity-80 hover:shadow-sm active:opacity-75 disabled:cursor-wait disabled:opacity-45 dark:border-white/15 dark:bg-black dark:text-white'
        >
          {isPending ? 'Syncing...' : 'Clear cart'}
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
