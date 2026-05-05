'use client'

import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { BsArrowRight } from 'react-icons/bs'

import { useProducts } from '@/features/products/hooks/useProducts'
import { Product } from '@/features/products/types'
import { routes } from '@/lib/routes'
import { cn } from '@/lib/utils/cn'

export const NavbarSearch = () => {
  const [search, setSearch] = useState('')
  const [result, setResult] = useState<Product[]>([])

  const { data: products } = useProducts()
  const router = useRouter()

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)

    if (!value.trim()) {
      setResult([])
      return
    }

    if (products) {
      setResult(
        products
          .filter((product) =>
            product.name.toLowerCase().includes(value.toLowerCase()),
          )
          .slice(0, 4),
      )
    }
  }

  const itemClickHandler = (id: number) => {
    router.push(routes.products.product(id))
    setSearch('')
  }

  return (
    <div className='relative hidden w-full max-w-50 drop-shadow-lg md:block md:max-w-none'>
      <input
        value={search}
        onChange={inputChangeHandler}
        type='text'
        placeholder='Search products...'
        className='w-full rounded-full bg-zinc-50/15 px-6 py-2 placeholder:text-gray-50/90 focus:outline-none dark:bg-zinc-800/50 dark:placeholder:text-white/90'
      />
      <button className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-200 hover:opacity-85 active:opacity-75 dark:text-gray-400/90'>
        <SearchIcon />
      </button>
      <div
        className={cn(
          'absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/80 shadow-lg transition-all dark:border-zinc-800 dark:bg-zinc-800/60',
          !search.length && 'hidden',
        )}
      >
        {result.length ? (
          <div className='max-h-80 overflow-y-auto p-2'>
            {result.map((product) => (
              <div
                onClick={() => itemClickHandler(product.id)}
                key={product.id}
                className='group flex cursor-pointer items-center gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50'
              >
                <div className='flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800'>
                  <img
                    src={product.image || '/placeholder.jpg'}
                    alt={product.name}
                    className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-110'
                  />
                </div>

                <div className='flex flex-1 flex-col overflow-hidden'>
                  <span className='truncate text-sm font-medium text-zinc-900 dark:text-white'>
                    {product.name}
                  </span>
                  <div className='mt-0.5 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400'>
                    <span>{product.category}</span>
                    <span className='h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600' />
                    <span className='font-medium text-zinc-900 dark:text-zinc-200'>
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <BsArrowRight className='h-3 w-3 text-zinc-900 transition duration-300 group-hover:translate-x-1 dark:text-white' />
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center py-8 text-center'>
            <div className='mb-2 rounded-full bg-zinc-100 p-2 dark:bg-zinc-800'>
              <SearchIcon className='h-5 w-5 text-zinc-400 dark:text-zinc-500' />
            </div>
            <p className='text-sm text-zinc-500 dark:text-zinc-400'>
              No products found for &quot;{search}&quot;
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
