import { motion } from 'framer-motion'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'

import { routes } from '@/lib/routes'

import { useCart } from '../hooks/useCart'
import { CartItem } from '../types'

type Props = { item: CartItem }

export const CartItemCard = ({ item }: Props) => {
  const { addItem, removeItem, clearItem } = useCart()

  return (
    <div className='group rounded-xl border border-black/5 bg-white p-2 transition-colors hover:border-black/10 sm:grid sm:grid-cols-[2fr_1fr_1fr_1fr] sm:items-center sm:gap-4 lg:gap-8 dark:border-white/5 dark:bg-zinc-900 dark:hover:border-white/10'>
      <Link
        href={routes.products.product(item.productId)}
        className='mb-3 flex items-center gap-4 font-medium text-black sm:mb-0 dark:text-white'
      >
        <img
          src={item.image}
          alt={item.name}
          className='aspect-square w-18 rounded-xl'
        />
        <p>{item.name}</p>
      </Link>

      <div className='hidden text-center text-sm text-black/60 sm:block dark:text-white/60'>
        ${item.price.toFixed(2)}
      </div>

      <div className='hidden items-center justify-center gap-2 sm:flex'>
        <button
          onClick={() => removeItem(item.productId)}
          className='flex h-7 w-7 items-center justify-center rounded-full border border-black/10 text-xs transition hover:bg-black hover:text-white dark:border-white/10 dark:text-white dark:hover:bg-white dark:hover:text-black'
        >
          <Minus className='h-3 w-2' />
        </button>
        <motion.span
          className='w-6 text-center text-sm font-medium text-black dark:text-white'
          key={item.productId}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.12 }}
        >
          {item.quantity}
        </motion.span>
        <button
          onClick={() => addItem({ ...item, quantity: 1 })}
          className='flex h-7 w-7 items-center justify-center rounded-full border border-black/10 text-xs transition hover:bg-black hover:text-white dark:border-white/10 dark:text-white dark:hover:bg-white dark:hover:text-black'
        >
          <Plus className='h-3 w-3' />
        </button>
      </div>

      <div className='hidden items-center justify-end gap-4 sm:flex'>
        <span className='font-semibold text-black dark:text-white'>
          ${(item.price * item.quantity).toFixed(2)}
        </span>
        <button
          onClick={() => clearItem(item.productId)}
          className='text-black/20 transition hover:text-red-500 dark:text-white/20 dark:hover:text-red-400'
        >
          <Trash2 className='h-4 w-4' />
        </button>
      </div>

      {/* Mobile */}
      <div className='mt-3 flex items-center justify-between gap-2 border-t border-black/5 pt-3 sm:hidden dark:border-white/5'>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => removeItem(item.productId)}
            className='flex h-6 w-6 items-center justify-center rounded-full border border-black/10 text-xs hover:bg-black hover:text-white dark:border-white/10 dark:text-white dark:hover:bg-white dark:hover:text-black'
          >
            <Minus className='h-3 w-2' />
          </button>
          <span className='w-5 text-center text-xs font-medium text-black dark:text-white'>
            {item.quantity}
          </span>
          <button
            onClick={() => addItem({ ...item, quantity: 1 })}
            className='flex h-6 w-6 items-center justify-center rounded-full border border-black/10 text-xs hover:bg-black hover:text-white dark:border-white/10 dark:text-white dark:hover:bg-white dark:hover:text-black'
          >
            <Plus className='h-3 w-3' />
          </button>
        </div>
        <div className='flex items-center gap-2'>
          <span className='font-semibold text-black dark:text-white'>
            ${(item.price * item.quantity).toFixed(2)}
          </span>
          <button
            onClick={() => clearItem(item.productId)}
            className='text-black/20 hover:text-red-500 dark:text-white/20 dark:hover:text-red-400'
          >
            <Trash2 className='h-4 w-4' />
          </button>
        </div>
      </div>
    </div>
  )
}
