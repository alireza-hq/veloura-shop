import { api } from '@/lib/api/client'
import { endpoints } from '@/lib/endpoints'

export const getCartService = async () => {
  const { data } = await api.get(endpoints.cart.getCart)
  return data
}

export const addCartItemService = async (data: {
  productId: number
  quantity: number
}) => {
  const res = await api.post(endpoints.cart.addCartItem, data)
  return res.data
}

export const updateCartItemService = async (
  productId: number,
  quantity: number,
) => {
  const { data } = await api.patch(endpoints.cart.updateCartItem(productId), {
    quantity,
  })

  return data
}

export const removeCartItemService = async (productId: number) => {
  const { data } = await api.delete(endpoints.cart.removeCartItem(productId))
  return data
}
