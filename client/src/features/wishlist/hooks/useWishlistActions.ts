import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  addToWishlistService,
  removeFromWishlistService,
} from '../services/wishlistApi'

export const useWishlistActions = () => {
  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: addToWishlistService,
    onSuccess: (data) => {
      queryClient.setQueryData(['wishlist'], data)
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
    },
  })

  const removeMutation = useMutation({
    mutationFn: removeFromWishlistService,
    onSuccess: (data) => {
      queryClient.setQueryData(['wishlist'], data)
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
    },
  })

  return {
    addToWishlist: addMutation.mutate,
    removeFromWishlist: removeMutation.mutate,

    isPending: addMutation.isPending || removeMutation.isPending,
  }
}
