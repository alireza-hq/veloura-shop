'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs'

import { ProductCard } from '@/features/products/components/ProductCard'
import { useProducts } from '@/features/products/hooks/useProducts'
import { routes } from '@/lib/routes'
import { cn } from '@/lib/utils/cn'

import type { Dispatch, SetStateAction } from 'react'

type FilterButtonProps = {
  filterName: string
  filter: string
  setFilter: Dispatch<SetStateAction<string>>
}

const FilterButton = ({ filterName, filter, setFilter }: FilterButtonProps) => {
  return (
    <button
      type='button'
      onClick={() => setFilter(filterName)}
      className={cn(
        'rounded-full px-4 py-1.5 text-xs transition-all duration-300 sm:px-6 sm:py-1 sm:text-sm',
        filter === filterName
          ? 'bg-black text-white dark:bg-white dark:text-black'
          : 'border border-black/20 text-black/60 backdrop-blur-md hover:border-black/40 hover:text-black dark:border-white/20 dark:text-white/60 dark:hover:border-white/40 dark:hover:text-white',
      )}
    >
      {filterName}
    </button>
  )
}

export const HomeProductList = () => {
  const { data: products = [], isLoading, error } = useProducts()

  const [filter, setFilter] = useState('All')

  const filters = useMemo(() => {
    const categoryTitles = products
      .sort((product) => product.category?.id)
      .map((product) => product.category?.title)
      .filter(Boolean)

    return ['All', ...Array.from(new Set(categoryTitles))]
  }, [products])

  const filteredProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => b.rating - a.rating)
      .filter((product) => {
        return filter === 'All' || product.category?.title === filter
      })
      .slice(0, 4)
  }, [products, filter])

  if (isLoading) {
    return <div className='py-10 text-center dark:text-white'>Loading...</div>
  }

  if (error) {
    return (
      <div className='py-10 text-center dark:text-white'>
        Failed to load products.
      </div>
    )
  }

  return (
    <>
      <div className='flex flex-wrap items-center justify-between gap-4 py-8 sm:py-10'>
        <div className='flex flex-wrap gap-2'>
          {filters.map((f) => (
            <FilterButton
              key={f}
              filterName={f}
              filter={filter}
              setFilter={setFilter}
            />
          ))}
        </div>

        <Link
          href={routes.products.root}
          className='group inline-flex items-center gap-1 text-sm font-medium text-black/60 transition hover:gap-1.5 hover:text-black dark:text-white/60 dark:hover:text-white'
        >
          View all <BsArrowRight />
        </Link>
      </div>

      {filteredProducts.length === 0 ? (
        <div className='py-10 text-center text-sm text-black/40 dark:text-white/40'>
          No products found.
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:grid-cols-3 2xl:grid-cols-4'>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </>
  )
}
