export type AdminStats = {
  totalProducts: number
  totalCategories: number
  totalOrders: number
  totalUsers: number
  totalRevenue: number
  recentOrders: Array<{
    id: number
    total: number
    status: string
    createdAt: string
    user: {
      id: number
      username: string
      email: string
    }
  }>
}
