export type CartItem = {
  productId: number
  name: string
  image: string
  price: number
  quantity: number
}

export type ApiCart = {
  id: number
  items: Array<{
    quantity: number
    product: {
      id: number
      name: string
      image: string
      price: number | string
    }
  }>
}
