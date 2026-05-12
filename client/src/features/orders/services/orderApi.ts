import { api } from '@/lib/api/client';

import { Order } from '../types';

export const getOrders = async () => {
  const { data } = await api.get<Order[]>('/orders')
  return data
}
