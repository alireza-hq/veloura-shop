import { api } from '@/lib/api/client'
import { endpoints } from '@/lib/endpoints'

export type Review = {
  id: number
  rating: number
  comment: string
  createdAt: string
  updatedAt: string
  user: { id: number; username: string }
}

export const getReviews = async (productId: number) => {
  const { data } = await api.get<Review[]>(endpoints.products.reviews(productId))
  return data
}

export const saveReview = async (
  productId: number,
  review: { rating: number; comment: string },
) => {
  const { data } = await api.post<Review[]>(
    endpoints.products.reviews(productId),
    review,
  )
  return data
}
