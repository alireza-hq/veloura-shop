'use client'

import { useMemo, useState } from 'react'

import { CustomSelect } from '@/components/ui/CustomSelect'
import { Product } from '../types'
import { ProductCard } from './ProductCard'

type ProductListProps = {
  products: Product[]
  isLoading?: boolean
  emptyMessage?: string
}

type SortOption = 'price-asc' | 'price-desc' | 'name'

const ITEMS_PER_PAGE = 8

export const ProductList = ({
  products,
  isLoading = false,
  emptyMessage = 'No makeup found',
}: ProductListProps) => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        category === 'All' || p.category.title === category
      return matchesSearch && matchesCategory
    })
  }, [products, search, category])

  const sorted = useMemo(() => {
    const sortedProducts = [...filtered]
    if (sortBy === 'price-asc') {
      sortedProducts.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      sortedProducts.sort((a, b) => b.price - a.price)
    } else {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
    }
    return sortedProducts
  }, [filtered, sortBy])

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE)
  const paginated = sorted.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  )

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category.title))
    return ['All', ...Array.from(cats)]
  }, [products])

  if (isLoading) {
    return (
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className='animate-pulse rounded-xl border border-black/5 bg-black/5 p-4 dark:border-white/5 dark:bg-white/5'
          >
            <div className='aspect-4/5 w-full rounded-lg bg-black/10 dark:bg-white/10' />
            <div className='mt-3 h-3 w-3/4 rounded bg-black/10 dark:bg-white/10' />
            <div className='mt-2 h-3 w-1/2 rounded bg-black/10 dark:bg-white/10' />
          </div>
        ))}
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className='py-20 text-center text-sm text-black/40 dark:text-white/40'>
        {emptyMessage}
      </div>
    )
  }

  return (
    <div>
      {/* Filters & Search */}
      <div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        {/* Search */}
        <input
          type='text'
          placeholder='Search makeup...'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          className='w-full rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-black placeholder:text-black/30 focus:border-black focus:outline-none sm:w-64 dark:border-white/10 dark:bg-zinc-900 dark:text-white dark:placeholder:text-white/30 dark:focus:border-white'
        />

        {/* Category & Sort */}
        <div className='flex flex-wrap gap-2'>
          <CustomSelect
            value={category}
            onChange={(value) => {
              setCategory(value)
              setPage(1)
            }}
            options={categories.map((item) => ({ value: item, label: item }))}
          />

          <CustomSelect
            value={sortBy}
            onChange={setSortBy}
            options={[
              { value: 'name', label: 'Sort by name' },
              { value: 'price-asc', label: 'Price: low to high' },
              { value: 'price-desc', label: 'Price: high to low' },
            ]}
          />
        </div>
      </div>

      {/* Product Grid */}
      {paginated.length === 0 ? (
        <div className='py-20 text-center text-sm text-black/40 dark:text-white/40'>
          No makeup found
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:grid-cols-3 2xl:grid-cols-4'>
          {paginated.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='mt-10 flex justify-center gap-2'>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className='rounded-full border border-black/10 bg-white px-4 py-2 text-sm disabled:opacity-50 dark:border-white/10 dark:bg-black dark:text-white'
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`rounded-full px-3 py-2 text-sm ${
                page === num
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'border border-black/10 bg-white dark:border-white/10 dark:bg-black dark:text-white'
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className='rounded-full border border-black/10 bg-white px-4 py-2 text-sm disabled:opacity-50 dark:border-white/10 dark:bg-black dark:text-white'
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
