'use client'

import { useQuery } from '@tanstack/react-query'

import { getOrdersService } from '../services/orderApi'

export const useOrders = (enabled = true) =>
  useQuery({
    queryKey: ['orders'],
    queryFn: getOrdersService,
    enabled,
  })
