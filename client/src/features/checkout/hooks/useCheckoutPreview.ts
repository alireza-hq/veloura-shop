'use client'

import { useQuery } from '@tanstack/react-query'

import { getCheckoutService } from '../services/checkoutApi'

export const useCheckoutPreview = () =>
  useQuery({
    queryKey: ['checkout'],
    queryFn: getCheckoutService,
  })
