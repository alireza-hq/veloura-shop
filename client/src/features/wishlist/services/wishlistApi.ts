import { Product } from '@/features/products/types'
import { api } from '@/lib/api/client'
import { endpoints } from '@/lib/endpoints'

export const getWishlistService = async () => {
  const { data } = await api.get<Product[]>(endpoints.wishlist.getWishlist)

  return data
}

export const addToWishlistService = async (productId: number) => {
  const { data } = await api.post<Product[]>(endpoints.wishlist.addToWishlist, {
    productId,
  })

  return data
}

export const removeFromWishlistService = async (productId: number) => {
  const { data } = await api.delete<Product[]>(
    endpoints.wishlist.removeFromWishlist(productId),
  )

  return data
}
