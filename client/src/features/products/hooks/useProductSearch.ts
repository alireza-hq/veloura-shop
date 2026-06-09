'use client'

import { useQuery } from '@tanstack/react-query'

import { searchProductsService } from '../services/productApi'

export const useProductSearch = (query: string) => {
  const normalizedQuery = query.trim()

  return useQuery({
    queryKey: ['products', 'search', normalizedQuery],
    queryFn: () => searchProductsService(normalizedQuery),
    enabled: normalizedQuery.length >= 2,
    staleTime: 30_000,
  })
}
