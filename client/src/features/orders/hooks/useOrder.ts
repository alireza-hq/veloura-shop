'use client'

import { useQuery } from '@tanstack/react-query'

import { getOrderService } from '../services/orderApi'

export const useOrders = (id: number) =>
  useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrderService(id),
    enabled: !!id,
  })
