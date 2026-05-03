import { api } from '@/lib/api/client'

import { Product } from '../types'

export const getProducts = async () => {
  const { data } = await api.get<Product[]>('/products')
  return data
}

export const getProduct = async (id: string | number) => {
  const { data } = await api.get<Product>(`/products/${id}`)
  return data
}
