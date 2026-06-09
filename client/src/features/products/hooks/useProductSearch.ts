'use client'

import { useQuery } from '@tanstack/react-query'

import { searchProductsService } from '../services/productApi'

export const useProductSearch = (query: string, limit = 5) => {
  const normalizedQuery = query.trim()

  return useQuery({
    queryKey: ['products', 'search', normalizedQuery, limit],
    queryFn: () => searchProductsService(normalizedQuery, limit),
    enabled: normalizedQuery.length >= 2,
    staleTime: 30_000,
  })
}
