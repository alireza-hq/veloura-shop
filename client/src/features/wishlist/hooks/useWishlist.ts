'use client'

import { Product } from '@/features/products/types'
import { useQuery } from '@tanstack/react-query'

import { getWishlistService } from '../services/wishlistApi'
import { useAuthStore } from '@/features/auth/store/useAuthStore'

export const useWishlist = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlistService,
    enabled: isAuthenticated,
  })
}
