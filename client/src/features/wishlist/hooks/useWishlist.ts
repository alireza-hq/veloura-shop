'use client'

import { Product } from '@/features/products/types'
import { useQuery } from '@tanstack/react-query'
import { getWishlist } from '../services/wishlistApi'

export const useWishlist = () =>
  useQuery<Product[]>({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
  })
