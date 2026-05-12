'use client'

import { Heart, ShoppingCart } from 'lucide-react'

import { ScreenLayout } from '@/components/layout/ScreenLayout'
import { EmptyState } from '@/components/ui/EmptyState'
import { WishlistItems } from '@/features/wishlist/components/WishlistItems'
import { routes } from '@/lib/routes'
import { useWishlist } from '@/features/wishlist/hooks/useWishlist'

export default function Wishlist() {
  const { data: wishlistProducts, isLoading, error } = useWishlist()

  if (!wishlistProducts || wishlistProducts.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title='Your wishlist is empty'
        buttonText='Start Shopping'
        buttonIcon={ShoppingCart}
        route={routes.products.root}
      >
        Looks like you haven't added any favorites yet. Start exploring our
        collection!
      </EmptyState>
    )
  }

  return (
    <ScreenLayout>
      <WishlistItems products={wishlistProducts} />
    </ScreenLayout>
  )
}
