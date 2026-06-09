'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { payOrderService } from '../services/orderApi'

export const usePayOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: payOrderService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['order'] })
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] })
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] })
    },
  })
}
