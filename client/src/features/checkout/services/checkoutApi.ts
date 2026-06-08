import { api } from '@/lib/api/client'
import { endpoints } from '@/lib/endpoints'
import { CheckoutPreview } from '../types'

export const getCheckoutService = async () => {
  const { data } = await api.post<CheckoutPreview>(
    endpoints.checkout.getCheckout,
  )

  return data
}
