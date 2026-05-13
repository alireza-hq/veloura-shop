'use client'

import { useQuery } from '@tanstack/react-query'

import { getProductsService } from '../services/productApi'
import { Product } from '../types'

export const useProducts = () =>
  useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProductsService,
  })
