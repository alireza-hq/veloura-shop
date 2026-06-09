'use client'

import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs'

import { useProductSearch } from '@/features/products/hooks/useProductSearch'
import { routes } from '@/lib/routes'
import { cn } from '@/lib/utils/cn'

export const NavbarSearch = ({ light = true }: { light?: boolean }) => {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  const { data: result = [], isFetching } = useProductSearch(debouncedSearch)
  const router = useRouter()

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search), 250)
    return () => window.clearTimeout(timer)
  }, [search])

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const itemClickHandler = (id: number) => {
    router.push(routes.products.product(id))
    setSearch('')
  }

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = search.trim()
    if (query.length < 2) return
    router.push(routes.search(query))
    setSearch('')
  }

  return (
    <form
      onSubmit={submitSearch}
      className='relative hidden w-48 drop-shadow-lg lg:block lg:w-60 xl:w-72'
    >
      <input
        value={search}
        onChange={inputChangeHandler}
        type='text'
        placeholder='Search makeup...'
        className={cn(
          'w-full rounded-full border bg-transparent px-5 py-2 text-sm backdrop-blur-sm transition focus:outline-none',
          light
            ? 'border-white/12 text-white placeholder:text-white/55 focus:border-white/30'
            : 'border-black/10 text-[#2a1c23] placeholder:text-black/40 focus:border-black/25 dark:border-white/12 dark:text-white dark:placeholder:text-white/50',
        )}
      />
      <button
        type='submit'
        aria-label='Search products'
        className={cn(
          'absolute top-1/2 right-3 -translate-y-1/2 transition hover:opacity-70',
          light ? 'text-white/75' : 'text-black/55 dark:text-white/70',
        )}
      >
        <SearchIcon className='h-4 w-4' />
      </button>
      <div
        className={cn(
          'absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-2xl border border-black/8 bg-white/95 shadow-xl backdrop-blur-xl transition-all dark:border-white/10 dark:bg-zinc-950/95',
          !search.length && 'hidden',
        )}
      >
        {isFetching ? (
          <p className='px-5 py-6 text-center text-sm text-zinc-500 dark:text-zinc-400'>
            Searching...
          </p>
        ) : result.length ? (
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
                    <span>{product.category.title}</span>
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
          <div className='flex flex-col items-center justify-center px-4 py-8 text-center'>
            <div className='mb-2 rounded-full bg-zinc-100 p-2 dark:bg-zinc-800'>
              <SearchIcon className='h-5 w-5 text-zinc-400 dark:text-zinc-500' />
            </div>
            <p className='text-sm text-zinc-500 dark:text-zinc-400'>
              {search.trim().length < 2
                ? 'Type at least two characters'
                : `No makeup found for "${search}"`}
            </p>
          </div>
        )}
      </div>
    </form>
  )
}
