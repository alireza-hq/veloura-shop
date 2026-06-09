'use client'

import { Minus, Plus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { MdAddShoppingCart } from 'react-icons/md'

import { useCart } from '@/features/cart/hooks/useCart'
import { Category } from '@/features/categories/types'
import { routes } from '@/lib/routes'

type Props = {
  id: number
  image: string
  name: string
  category: Category
  price: number
}

export const ProductCard = ({ id, image, name, category, price }: Props) => {
  const { items, addItem, removeItem } = useCart()

  const cartItem = items.find((i) => i.productId === id)

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <Link
      href={routes.products.product(id)}
      className='group cursor-pointer overflow-hidden rounded-3xl border border-black/8 bg-white/75 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5'
    >
      <div className='overflow-hidden bg-black/3 dark:bg-white/3'>
        <Image
          src={image || '/logo/logo.png'}
          alt={name}
          width={640}
          height={800}
          className='aspect-4/5 w-full object-cover transition-transform duration-500 group-hover:scale-105'
        />
      </div>

      <div className='px-3 py-4 sm:px-4 sm:py-3'>
        <p className='text-[10px] tracking-widest text-black/40 uppercase sm:text-xs dark:text-white/40'>
          {category.title}
        </p>

        <h3 className='mt-1 truncate text-sm font-medium text-black sm:text-base dark:text-white'>
          {name}
        </h3>

        <div className='mt-3 flex items-center justify-between gap-3'>
          <p className='text-sm font-semibold text-black sm:text-base dark:text-white'>
            ${price.toFixed(2)}
          </p>

          {cartItem ? (
            <div
              onClick={handleCartClick}
              className='flex cursor-default items-center gap-2 rounded-full border border-black/10 bg-white/80 px-1.5 py-1 dark:border-white/10 dark:bg-white/5'
            >
              <button
                type='button'
                onClick={() => removeItem(id)}
                className='flex h-6 w-6 items-center justify-center rounded-full text-black transition hover:bg-black hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black'
              >
                <Minus className='h-3 w-3' />
              </button>

              <span className='w-4 text-center text-sm font-medium text-black dark:text-white'>
                {cartItem.quantity}
              </span>

              <button
                type='button'
                onClick={() =>
                  addItem({
                    productId: id,
                    name,
                    price,
                    quantity: 1,
                    image,
                  })
                }
                className='flex h-6 w-6 items-center justify-center rounded-full text-black transition hover:bg-black hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black'
              >
                <Plus className='h-3 w-3' />
              </button>
            </div>
          ) : (
            <button
              type='button'
              aria-label={`Add ${name} to cart`}
              className='rounded-full border border-black/15 p-2 transition-all duration-200 hover:border-black hover:bg-black hover:text-white dark:border-white/20 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black'
              onClick={(e) => {
                handleCartClick(e)

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
