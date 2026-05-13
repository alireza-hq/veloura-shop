import { api } from '@/lib/api/client'
import { endpoints } from '@/lib/endpoints'

export const getCheckoutService = async () => {
  const { data } = await api.post(endpoints.checkout.getCheckout)

  return data
}
