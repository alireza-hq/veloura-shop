'use client'

import { useQuery } from '@tanstack/react-query';

import { getProduct } from '../services/productApi';
import { Product } from '../types';

export const useProduct = (id: number) =>
  useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  })
