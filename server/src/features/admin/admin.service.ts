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
      WHERE status IN ('paid', 'processing', 'shipped', 'delivered')
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

export const getAdminOrders = async () => {
  const { rows } = await db.query(`
    SELECT
      o.id,
      o.subtotal,
      o.shipping,
      o.tax,
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
  `)

  return rows
}

export const updateOrderStatus = async (id: number, status: string) => {
  const allowedFrom: Record<string, string[]> = {
    paid: ['pending'],
    processing: ['paid'],
    shipped: ['processing'],
    delivered: ['shipped'],
    cancelled: ['pending', 'paid', 'processing'],
  }
  const previousStatuses = allowedFrom[status] ?? []
  if (!previousStatuses.length) return null

  const { rows } = await db.query(
    `
    UPDATE orders
    SET status = $1
    WHERE id = $2
      AND status = ANY($3::text[])
    RETURNING *
    `,
    [status, id, previousStatuses],
  )

  return rows[0]
}

export const getAdminUsers = async () => {
  const { rows } = await db.query(`
    SELECT
      id,
      username,
      email,
      role,
      created_at AS "createdAt"
    FROM users
    ORDER BY created_at DESC
  `)

  return rows
}

export const updateUserRole = async (id: number, role: 'user' | 'admin') => {
  const { rows } = await db.query(
    `
    UPDATE users
    SET role = $1
    WHERE id = $2
    RETURNING
      id,
      username,
      email,
      role,
      created_at AS "createdAt"
    `,
    [role, id],
  )

  return rows[0]
}
