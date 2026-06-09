'use client'

import { Search } from 'lucide-react'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

import { PageHeader } from '@/components/ui/PageHeader'
import { ProductCard } from '@/features/products/components/ProductCard'
import { useProductSearch } from '@/features/products/hooks/useProductSearch'

const SearchResults = () => {
  const query = useSearchParams().get('q')?.trim() ?? ''
  const { data: products = [], isLoading, error } = useProductSearch(query, 50)

  return (
    <main className='page-shell'><div className='page-content'>
      <PageHeader
        eyebrow='Search results'
        title={query ? `Results for "${query}"` : 'Find your next essential'}
        description={
          query
            ? `${products.length} ${products.length === 1 ? 'product' : 'products'} matched your search.`
            : 'Search from the navigation to explore the Veloura edit.'
        }
      />

      {isLoading && query.length >= 2 ? (
        <div className='grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4'>
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className='aspect-4/5 animate-pulse rounded-3xl bg-black/5 dark:bg-white/5'
            />
          ))}
        </div>
      ) : error ? (
        <p className='border-y border-black/8 py-12 text-sm text-red-600 dark:border-white/10 dark:text-red-400'>
          Search is unavailable right now. Please try again.
        </p>
      ) : products.length ? (
        <div className='grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4'>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className='flex min-h-64 flex-col items-center justify-center border-y border-black/8 text-center dark:border-white/10'>
          <span className='rounded-full bg-rose-100 p-4 text-rose-900 dark:bg-rose-950/35 dark:text-rose-100'>
            <Search className='h-5 w-5' />
          </span>
          <h2 className='mt-5 text-lg font-semibold text-black dark:text-white'>
            No products found
          </h2>
          <p className='mt-2 max-w-sm text-sm leading-6 text-black/45 dark:text-white/45'>
            Try a product name, collection, finish, or a broader phrase.
          </p>
        </div>
      )}
    </div></main>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<main className='page-shell'><div className='page-content min-h-96' /></main>}>
      <SearchResults />
    </Suspense>
  )
}
