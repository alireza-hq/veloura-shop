'use client'

import { useQuery } from '@tanstack/react-query'

import { getCategory } from '../services/categoryApi'

export const useCategory = (id: number) =>
  useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategory(id),
    enabled: !!id,
  })
