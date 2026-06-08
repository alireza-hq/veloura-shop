import { api } from '@/lib/api/client'
import { endpoints } from '@/lib/endpoints'
import { ApiCart } from '../types'

export const getCartService = async () => {
  const { data } = await api.get<ApiCart>(endpoints.cart.getCart)
  return data
}

export const addCartItemService = async (data: {
  productId: number
  quantity: number
}) => {
  const res = await api.post<ApiCart>(endpoints.cart.addCartItem, data)
  return res.data
}

export const updateCartItemService = async (
  productId: number,
  quantity: number,
) => {
  const { data } = await api.patch<ApiCart>(
    endpoints.cart.updateCartItem(productId),
    { quantity },
  )

  return data
}

export const removeCartItemService = async (productId: number) => {
  const { data } = await api.delete<ApiCart>(
    endpoints.cart.removeCartItem(productId),
  )
  return data
}
