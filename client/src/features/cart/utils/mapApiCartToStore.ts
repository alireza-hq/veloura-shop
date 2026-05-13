import { CartItem } from '../types'

export const mapApiCartToStore = (cart: any): CartItem[] => {
  return cart.items.map((item: any) => ({
    productId: item.product.id,
    name: item.product.name,
    image: item.product.image,
    price: Number(item.product.price),
    quantity: item.quantity,
  }))
}
