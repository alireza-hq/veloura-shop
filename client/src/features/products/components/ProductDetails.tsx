'use client'

import { Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react'

import { useCart } from '@/features/cart/hooks/useCart'
import { cn } from '@/lib/utils/cn'

import { Product } from '../types'
import { useWishlist } from '@/features/wishlist/hooks/useWishlist'
import { useWishlistActions } from '@/features/wishlist/hooks/useWishlistActions'

type Props = {
  product: Product
}

export const ProductDetails = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCart()

  const cartItem = items.find((i) => i.productId === product.id)

  const handleAddToCart = () => {
    if (product.stock === 0) return

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image || '/lol.jpg',
    })
  }

  const handleRemove = () => {
    removeItem(product.id)
  }

  const { data: wishlist = [] } = useWishlist()
  const {
    addToWishlist,
    removeFromWishlist,
    isPending: wishlistPending,
  } = useWishlistActions()

  const isInWishlist = wishlist.some((p) => p.id === product.id)

  const isInCart = !!cartItem
  const isOutOfStock = product.stock === 0

  return (
    <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
      <div className='grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16'>
        {/* Image Section */}
        <div className='group relative aspect-4/5 w-full overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-800/50'>
          <img
            src={product.image || '/lol.jpg'}
            alt={product.name}
            className='h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105'
          />
        </div>

        {/* Info Section */}
        <div className='flex flex-col justify-center'>
          {/* Header */}
          <div className='mb-4'>
            <h2 className='text-sm font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400'>
              {product.category.title}
            </h2>
            <h1 className='mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white'>
              {product.name}
            </h1>
          </div>

          {/* Rating & Stock */}
          <div className='mb-6 flex items-center gap-4'>
            <div className='flex items-center gap-1 text-yellow-500'>
              <Star className='h-5 w-5 fill-current' />
              <span className='text-sm font-semibold text-zinc-700 dark:text-zinc-300'>
                {product.rating}
              </span>
            </div>
            <div className='h-4 w-px bg-zinc-200 dark:bg-zinc-700' />
            <span
              className={cn(
                'flex items-center gap-1.5 text-sm font-medium',
                isOutOfStock
                  ? 'text-red-600'
                  : 'text-emerald-600 dark:text-emerald-400',
              )}
            >
              {isOutOfStock ? 'Out of Stock' : 'In Stock'}
            </span>
          </div>

          {/* Price & Description */}
          <div className='mb-8'>
            <p className='text-3xl font-bold text-zinc-900 dark:text-white'>
              ${product.price.toFixed(2)}
            </p>
            <p className='mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400'>
              {product.description}
            </p>
          </div>

          {/* Controls */}
          <div className='flex gap-4 sm:items-center'>
            {isInCart ? (
              <div className='flex w-full items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-2 sm:w-auto dark:border-zinc-700 dark:bg-zinc-900'>
                <button
                  onClick={handleRemove}
                  disabled={isOutOfStock}
                  className='flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-50 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white'
                >
                  <Minus className='h-4 w-4' />
                </button>

                <span className='w-8 text-center text-lg font-semibold text-zinc-900 dark:text-white'>
                  {cartItem?.quantity}
                </span>

                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className='flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-50 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white'
                >
                  <Plus className='h-4 w-4' />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={cn(
                  'flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all',
                  isOutOfStock
                    ? 'cursor-not-allowed bg-zinc-400 opacity-70'
                    : 'bg-zinc-900 hover:bg-zinc-800 active:scale-95 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200',
                )}
              >
                <ShoppingCart className='h-4 w-4' />
                <span>Add to Cart</span>
              </button>
            )}

            {/* Wishlist Button */}
            <button
              disabled={wishlistPending}
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-500 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-white',
              )}
              aria-label='Add to wishlist'
              onClick={() => {
                if (isInWishlist) {
                  removeFromWishlist(product.id)
                } else {
                  addToWishlist(product.id)
                }
              }}
            >
              <Heart
                className={cn(
                  'h-5 w-5',
                  isInWishlist &&
                    'fill-black text-black dark:fill-white dark:text-white',
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
