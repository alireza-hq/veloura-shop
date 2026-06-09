import Link from 'next/link'

import { routes } from '@/lib/routes'

import { useCart } from '../hooks/useCart'

export const CartFooter = () => {
  const { items, clearCart, isPending } = useCart()

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = total >= 100 ? 0 : 15
  const tax = total * 0.1
  const grandTotal = total + shipping + tax

  return (
    <aside className='sticky top-28 rounded-[2rem] border border-black/8 bg-white/60 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5'>
      <p className='text-xs font-semibold tracking-[0.2em] text-rose-900/50 uppercase dark:text-rose-100/50'>
        Order summary
      </p>
      <h2 className='mt-3 text-2xl font-semibold tracking-tight text-black dark:text-white'>
        Ready when you are.
      </h2>

      <div className='mt-7 space-y-3 border-y border-black/8 py-5 text-sm dark:border-white/10'>
        <SummaryLine label='Subtotal' value={total} />
        <SummaryLine label='Shipping' value={shipping} free={!shipping} />
        <SummaryLine label='Estimated tax' value={tax} />
      </div>

      <div className='flex items-end justify-between pt-5'>
        <p className='text-sm text-black/45 dark:text-white/45'>Total</p>
        <p className='text-3xl font-semibold tracking-tight text-black dark:text-white'>
          ${grandTotal.toFixed(2)}
        </p>
      </div>

      <Link
        href={routes.checkout}
        className='mt-6 block rounded-full bg-black px-8 py-3.5 text-center text-sm font-semibold text-white transition hover:opacity-75 dark:bg-white dark:text-[#24191e]'
      >
        Continue to checkout
      </Link>
      <button
        type='button'
        disabled={isPending}
        onClick={() => clearCart()}
        className='mt-3 w-full py-2 text-xs font-medium text-black/38 transition hover:text-red-600 disabled:cursor-wait dark:text-white/38 dark:hover:text-red-400'
      >
        {isPending ? 'Syncing...' : 'Clear bag'}
      </button>
    </aside>
  )
}

const SummaryLine = ({
  label,
  value,
  free = false,
}: {
  label: string
  value: number
  free?: boolean
}) => (
  <div className='flex justify-between gap-4 text-black/48 dark:text-white/48'>
    <span>{label}</span>
    <span className='font-medium text-black dark:text-white'>
      {free ? 'Free' : `$${value.toFixed(2)}`}
    </span>
  </div>
)
