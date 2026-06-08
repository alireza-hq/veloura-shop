import { ApiCart, CartItem } from '../types'

export const mapApiCartToStore = (cart: ApiCart): CartItem[] => {
  return cart.items.map((item) => ({
    productId: item.product.id,
    name: item.product.name,
    image: item.product.image,
    price: Number(item.product.price),
    quantity: item.quantity,
  }))
}
