import { api } from '@/lib/api/client';

import { Category } from '../types';

export const getCategories = async () => {
  const { data } = await api.get<Category[]>('/categories')
  return data
}
