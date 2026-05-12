import { api } from '@/lib/api/client';
import { endpoints } from '@/lib/endpoints';

import { Product } from '../types';

export const getProducts = async () => {
  const { data } = await api.get<Product[]>(endpoints.products.getProducts)
  return data
}

export const getProduct = async (id: number) => {
  const { data } = await api.get<Product>(endpoints.products.getProduct(id))
  return data
}
