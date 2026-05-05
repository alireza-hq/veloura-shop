'use client'

import { useQuery } from '@tanstack/react-query'

import { getOrders } from '../services/orderApi'
import { Order } from '../types'

export const useOrders = () =>
  useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: getOrders,
  })
