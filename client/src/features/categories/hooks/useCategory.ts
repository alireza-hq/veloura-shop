'use client'

import { useQuery } from '@tanstack/react-query'

import { getCategory } from '../services/categoryApi'
import { Category } from '../types'

export const useCategory = (id: number) =>
  useQuery<Category>({
    queryKey: ['category', id],
    queryFn: () => getCategory(id),
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: 'always',
  })
