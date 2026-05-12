import { Product } from '@/features/products/types'
import { api } from '@/lib/api/client'
import { endpoints } from '@/lib/endpoints'

export const getWishlist = async () => {
  const { data } = await api.get<Product[]>(endpoints.wishlist.getWishlist)

  return data
}
