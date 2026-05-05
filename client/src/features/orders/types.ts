type Status = 'PENDING' | 'PAID' | 'CANCELLED'

export type OrderItem = {
  id?: number
  orderId?: number
  productId?: number
  quantity?: number
  titleSnapshot?: string
  priceSnapshot?: number
}

export type Order = {
  id?: number
  total: number
  status: Status
  items: OrderItem[]
  createdAt?: string
}
