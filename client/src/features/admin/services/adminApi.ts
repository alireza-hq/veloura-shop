import { api } from '@/lib/api/client'
import { AdminStats } from '../types'

export const getAdminStatsService = async () => {
  const { data } = await api.get<AdminStats>('/admin/stats')

  return data
}
