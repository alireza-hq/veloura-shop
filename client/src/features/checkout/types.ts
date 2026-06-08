export type CheckoutPreview = {
  items: Array<{
    quantity: number
    product: {
      id: number
      name: string
      image: string
      price: number
    }
  }>
  subtotal: number
  shipping: number
  tax: number
  total: number
}
