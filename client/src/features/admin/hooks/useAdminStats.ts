'use client'

import { useQuery } from '@tanstack/react-query'
import { getAdminStatsService } from '../services/adminApi'

export const useAdminStats = () =>
  useQuery({
    queryKey: ['admin-stats'],
    queryFn: getAdminStatsService,
  })
