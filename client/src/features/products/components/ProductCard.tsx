'use client'

import { useCartStore } from '@/features/cart/store/useCartStore'
import { routes } from '@/lib/routes'
import { Minus, Plus } from 'lucide-react'
import Link from 'next/link'
import { MdAddShoppingCart } from 'react-icons/md'

type Props = {
  id: number
  image?: string
  name: string
  category: string
  price: number
}

export const ProductCard = ({ id, image, name, category, price }: Props) => {
  const cartItem = useCartStore((state) =>
    state.items.find((i) => i.productId === id),
  )

  const addItem = useCartStore((s) => s.addItem)
  const removeItem = useCartStore((s) => s.removeItem)

  return (
    <Link
      href={routes.products.product(id)}
      className='group cursor-pointer overflow-hidden rounded-xl border border-black/10 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900'
    >
      <div className='overflow-hidden'>
        <img
          src={image ?? '/lol.jpg'}
          alt={name}
          className='aspect-4/5 w-full object-cover transition-transform duration-500 group-hover:scale-105'
        />
      </div>

      <div className='px-3 py-4 sm:px-4 sm:py-3'>
        <p className='text-[10px] tracking-widest text-black/40 uppercase sm:text-xs dark:text-white/40'>
          {category}
        </p>
        <h3 className='mt-1 truncate text-sm font-medium text-black sm:text-base dark:text-white'>
          {name}
        </h3>

        <div className='mt-3 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-sm font-semibold text-black sm:text-base dark:text-white'>
            ${price.toFixed(2)}
          </p>

          {cartItem ? (
            <div
              onClick={(e) => e.preventDefault()}
              className='flex cursor-default items-center gap-3 rounded-full border border-black/10 bg-white px-2 py-1 dark:border-white/10 dark:bg-zinc-900'
            >
              <button
                onClick={() => removeItem(id)}
                className='flex h-6 w-6 items-center justify-center rounded-full text-black transition hover:bg-black hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black'
              >
                <Minus className='h-3 w-3' />
              </button>

              <span className='w-4 text-center text-sm font-medium text-black dark:text-white'>
                {cartItem.quantity}
              </span>

              <button
                onClick={() =>
                  addItem({ productId: id, name, price, quantity: 1, image })
                }
                className='flex h-6 w-6 items-center justify-center rounded-full text-black transition hover:bg-black hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black'
              >
                <Plus className='h-3 w-3' />
              </button>
            </div>
          ) : (
            <button
              className='rounded-full border border-black/20 p-2 transition-all duration-300 hover:border-black hover:bg-black hover:text-white dark:border-white/20 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black'
              onClick={(e) => {
                e.preventDefault()

                addItem({
                  productId: id,
                  name,
                  price,
                  quantity: 1,
                  image,
                })
              }}
            >
              <MdAddShoppingCart className='h-4 w-4' />
            </button>
          )}
        </div>
      </div>
    </Link>
  )
}
