import { api } from '@/lib/api/client'

export const getAdminStatsService = async () => {
  const { data } = await api.get('/admin/stats')

  return data
}
