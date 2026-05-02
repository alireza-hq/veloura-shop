'use client'

import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Product } from '../types'

export const useProduct = (id: number) =>
  useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await axios.get<Product>(
        `http://localhost:3001/products/${id}`
      )
      return data
    },
    enabled: !!id,
  })
