import { api } from '@/lib/api/client'
import { endpoints } from '@/lib/endpoints'

import { AdminOrder, AdminOrderStatus } from '../types'

export const getAdminOrdersService = async () => {
  const { data } = await api.get<AdminOrder[]>(endpoints.admin.orders.getOrders)

  return data
}

export const updateOrderStatusService = async ({
  id,
  status,
}: {
  id: number
  status: AdminOrderStatus
}) => {
  const { data } = await api.patch<AdminOrder>(
    endpoints.admin.orders.updateStatus(id),
    { status },
  )

  return data
}
