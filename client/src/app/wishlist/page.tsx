'use client'

import { EmptyState } from '@/components/EmptyState'
import { ScreenLayout } from '@/components/layout/ScreenLayout'
import { WishlistItems } from '@/features/wishlist/components/WishlistItems'
import { useWishlistStore } from '@/features/wishlist/store/useWishlistStore'
import { routes } from '@/lib/routes'
import { Heart, ShoppingCart } from 'lucide-react'

export default function Wishlist() {
  const { products } = useWishlistStore()

  if (products.length === 0) {
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
      <WishlistItems products={products} />
    </ScreenLayout>
  )
}
