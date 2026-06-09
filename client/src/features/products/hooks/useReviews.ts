'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getReviews, saveReview } from '../reviews'

export const useReviews = (productId: number) =>
  useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => getReviews(productId),
  })

export const useSaveReview = (productId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (review: { rating: number; comment: string }) =>
      saveReview(productId, review),
    onSuccess: (reviews) => {
      queryClient.setQueryData(['reviews', productId], reviews)
      queryClient.invalidateQueries({ queryKey: ['product', productId] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
