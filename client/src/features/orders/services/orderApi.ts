import { api } from '@/lib/api/client'
import { endpoints } from '@/lib/endpoints'
import { Order } from '../types'

export const createOrderService = async () => {
  const { data } = await api.post(endpoints.orders.createOrder)

  return data
}

export const getOrdersService = async () => {
  const { data } = await api.get<Order[]>(endpoints.orders.getOrders)

  return data
}

export const getOrderService = async (id: number) => {
  const { data } = await api.get<Order>(endpoints.orders.getOrder(id))

  return data
}
