'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateOrderStatusService } from '../services/adminOrdersApi'

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateOrderStatusService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin-orders'],
      })

      queryClient.invalidateQueries({
        queryKey: ['orders'],
      })

      queryClient.invalidateQueries({
        queryKey: ['admin-stats'],
      })
    },
  })
}
