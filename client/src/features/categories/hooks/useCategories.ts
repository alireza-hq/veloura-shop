'use client'

import { useQuery } from '@tanstack/react-query'
import { Category } from '../types'
import axios from 'axios'
import { getCategories } from '../services/categoryApi'

export const useCategories = () =>
  useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
