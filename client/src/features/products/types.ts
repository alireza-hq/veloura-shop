import { Category } from '../categories/types'

export type Product = {
  id: number
  image: string
  name: string
  description?: string
  price: number
  stock: number
  rating: number
  reviewCount?: number
  category: Category
}
