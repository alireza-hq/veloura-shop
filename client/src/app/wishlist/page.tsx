'use client'

import { Heart, ShoppingCart } from 'lucide-react'

import { ScreenLayout } from '@/components/layout/ScreenLayout'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { LoadingState } from '@/components/ui/LoadingState'
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
    <ScreenLayout>
      <WishlistItems products={wishlistProducts} />
    </ScreenLayout>
  )
}
