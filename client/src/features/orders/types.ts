export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export type OrderItem = {
  quantity: number
  price: number
  product: {
    id: number | null
    name: string
    image: string
  }
}

export type Order = {
  id: number
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: OrderStatus
  items?: OrderItem[]
  createdAt: string
}
