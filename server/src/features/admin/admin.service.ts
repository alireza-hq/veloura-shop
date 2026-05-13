import { db } from '@/config/db'

export const getAdminStats = async () => {
  const [
    productsResult,
    categoriesResult,
    ordersResult,
    usersResult,
    revenueResult,
    recentOrdersResult,
  ] = await Promise.all([
    db.query(`SELECT COUNT(*)::int AS count FROM products`),

    db.query(`SELECT COUNT(*)::int AS count FROM categories`),

    db.query(`SELECT COUNT(*)::int AS count FROM orders`),

    db.query(`SELECT COUNT(*)::int AS count FROM users`),

    db.query(`
      SELECT COALESCE(SUM(total), 0)::float AS revenue
      FROM orders
      WHERE status = 'paid'
    `),

    db.query(`
      SELECT
        o.id,
        o.total,
        o.status,
        o.created_at AS "createdAt",

        json_build_object(
          'id', u.id,
          'username', u.username,
          'email', u.email
        ) AS user

      FROM orders o

      JOIN users u
        ON o.user_id = u.id

      ORDER BY o.created_at DESC
      LIMIT 5
    `),
  ])

  return {
    totalProducts: productsResult.rows[0].count,
    totalCategories: categoriesResult.rows[0].count,
    totalOrders: ordersResult.rows[0].count,
    totalUsers: usersResult.rows[0].count,
    totalRevenue: revenueResult.rows[0].revenue,

    recentOrders: recentOrdersResult.rows,
  }
}
