'use client'

import Link from 'next/link'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs'

import { ProductCard } from '@/features/products/components/ProductCard'
import { useProducts } from '@/features/products/hooks/useProducts'
import { routes } from '@/lib/routes'
import { cn } from '@/lib/utils/cn'

type FilterButtonProps = {
  filterName: string
  filter: string
  setFilter: Dispatch<SetStateAction<string>>
}

const FilterButton = ({ filterName, filter, setFilter }: FilterButtonProps) => {
  return (
    <button
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

const FILTERS = [
  'All',
  'Face',
  'Eyes',
  'Lips',
  'Brows',
  'Cheeks',
  'Tools & Accessories',
]

export const HomeProductList = () => {
  const { data: products, isLoading, error } = useProducts()
  const [filter, setFilter] = useState('All')

  if (isLoading) {
    return <div className='py-10 text-center dark:text-white'>Loading...</div>
  }
  if (error) {
    return (
      <div className='py-10 text-center dark:text-white'>
        Error: {error.message}
      </div>
    )
  }

  const filteredProducts = products
    ?.sort((a, b) => b.rating - a.rating)
    .filter((product) => filter === 'All' || product.category === filter)
    .slice(0, 4)

  return (
    <>
      <div className='flex-warp flex items-center justify-between gap-4 py-8 sm:py-10'>
        <div className='flex flex-wrap gap-2'>
          {FILTERS.map((f) => (
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

      <div className='grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:grid-cols-3 2xl:grid-cols-4'>
        {filteredProducts?.map(({ id, name, category, price, image }) => (
          <ProductCard
            key={id}
            id={id}
            name={name}
            category={category}
            price={price}
            image={image}
          />
        ))}
      </div>
    </>
  )
}
