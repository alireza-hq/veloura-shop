'use client'

import { Heart, ShoppingCart } from 'lucide-react'

import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { LoadingState } from '@/components/ui/LoadingState'
import { PageHeader } from '@/components/ui/PageHeader'
import { WishlistItems } from '@/features/wishlist/components/WishlistItems'
import { routes } from '@/lib/routes'
import { useWishlist } from '@/features/wishlist/hooks/useWishlist'

export default function Wishlist() {
  const { data: wishlistProducts, isLoading, error } = useWishlist()

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState error={error} />

  if (!wishlistProducts || wishlistProducts.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title='Your wishlist is empty'
        buttonText='Explore Makeup'
        buttonIcon={ShoppingCart}
        route={routes.products.root}
      >
        Your saved beauty picks will appear here. Start exploring the
        collection.
      </EmptyState>
    )
  }

  return (
    <main className='page-shell'><div className='page-content'>
      <PageHeader
        eyebrow='Saved for later'
        title='Your wishlist'
        description='A personal edit of shades and essentials worth another look.'
      />
      <WishlistItems products={wishlistProducts} />
    </div></main>
  )
}
