'use client'

import { useQuery } from '@tanstack/react-query'

import { getProductService } from '../services/productApi'
import { Product } from '../types'

export const useProduct = (id: number) =>
  useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => getProductService(id),
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: 'always',
  })
