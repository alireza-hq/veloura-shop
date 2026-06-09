export type AdminOrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export type AdminOrder = {
  id: number
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: AdminOrderStatus
  createdAt: string
  user: {
    id: number
    username: string
    email: string
  }
}
