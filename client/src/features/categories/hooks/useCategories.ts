'use client'

import { useQuery } from '@tanstack/react-query'
import { Category } from '../types'
import axios from 'axios'

export const useCategories = () =>
  useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await axios.get<Category[]>('api/categories')
      return data
    },
  })
