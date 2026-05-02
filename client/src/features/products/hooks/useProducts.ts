'use client'

import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Product } from '../types'

export const useProducts = () =>
  useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.get<Product[]>('/api/products')
      return data
    },
  })
