'use client'

import { useQuery } from '@tanstack/react-query'

import { getAdminOrdersService } from '../services/adminOrdersApi'

export const useAdminOrders = () =>
  useQuery({
    queryKey: ['admin-orders'],
    queryFn: getAdminOrdersService,
  })
