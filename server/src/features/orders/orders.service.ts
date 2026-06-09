import { db } from '@/config/db'
import { AppError } from '@/middlewares/error.middleware'

export const expirePendingOrders = async () => {
  const client = await db.connect()

  try {
    await client.query('BEGIN')

    const { rows: expiredOrders } = await client.query<{ id: number }>(`
      SELECT id
      FROM orders
      WHERE status = 'pending'
        AND created_at <= NOW() - INTERVAL '1 hour'
      FOR UPDATE
    `)

    if (expiredOrders.length === 0) {
      await client.query('COMMIT')
      return
    }

    const orderIds = expiredOrders.map(({ id }) => id)

    await client.query(
      `
        UPDATE products p
        SET stock = p.stock + restored.quantity
        FROM (
          SELECT product_id, SUM(quantity)::int AS quantity
          FROM order_items
          WHERE order_id = ANY($1::int[])
            AND product_id IS NOT NULL
          GROUP BY product_id
        ) restored
        WHERE p.id = restored.product_id
      `,
      [orderIds],
    )

    await client.query(
      `
        UPDATE orders
        SET status = 'cancelled'
        WHERE id = ANY($1::int[])
          AND status = 'pending'
      `,
      [orderIds],
    )

    await client.query('COMMIT')
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

export const createOrder = async (userId: number) => {
  const client = await db.connect()

  try {
    await client.query('BEGIN')

    const cartQuery = await client.query(
      `
        SELECT
            ci.quantity,

            p.id,
            p.name,
            p.image,
            p.price,
            p.stock

        FROM carts c

        JOIN cart_items ci
            ON ci.cart_id = c.id

        JOIN products p
            ON p.id = ci.product_id

        WHERE c.user_id = $1
        `,
      [userId],
    )

    const items = cartQuery.rows

    if (items.length === 0) {
      throw new Error('Cart is empty')
    }

    for (const item of items) {
      if (item.quantity > item.stock) {
        throw new Error(`${item.name} does not have enough stock`)
      }
    }

    const subtotal = items.reduce((acc, item) => {
      return acc + Number(item.price) * item.quantity
    }, 0)

    const shipping = subtotal > 100 ? 0 : 15

    const tax = subtotal * 0.1

    const total = subtotal + shipping + tax

    const orderResult = await client.query(
      `
        INSERT INTO orders (
            user_id,
            subtotal,
            shipping,
            tax,
            total
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
      [userId, subtotal, shipping, tax, total],
    )

    const order = orderResult.rows[0]

    // create order items
    for (const item of items) {
      await client.query(
        `
            INSERT INTO order_items (
                order_id,
                product_id,
                product_name,
                product_image,
                price,
                quantity
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            `,
        [order.id, item.id, item.name, item.image, item.price, item.quantity],
      )

      // decreate stock
      await client.query(
        `
        UPDATE products
        SET stock = stock - $1
        WHERE id = $2
        `,
        [item.quantity, item.id],
      )

    }

    await client.query(
      `DELETE FROM cart_items
       WHERE cart_id IN (SELECT id FROM carts WHERE user_id = $1)`,
      [userId],
    )

    await client.query('COMMIT')
    return order
  } catch (err) {
    await client.query('ROLLBACK')

    throw err
  } finally {
    client.release()
  }
}

export const getOrderList = async (userId: number) => {
  await expirePendingOrders()

  const { rows } = await db.query(
    `
        SELECT
          o.id, o.subtotal, o.shipping, o.tax, o.total, o.status,
          o.created_at AS "createdAt",
          o.created_at + INTERVAL '1 hour' AS "paymentExpiresAt",
          COALESCE(
            json_agg(
              json_build_object(
                'quantity', oi.quantity,
                'price', oi.price,
                'product', json_build_object(
                  'id', oi.product_id,
                  'name', oi.product_name,
                  'image', oi.product_image
                )
              )
            ) FILTER (WHERE oi.id IS NOT NULL),
            '[]'
          ) AS items
        FROM orders o
        LEFT JOIN order_items oi ON oi.order_id = o.id
        WHERE o.user_id = $1
        GROUP BY o.id
        ORDER BY o.created_at DESC
        `,
    [userId],
  )

  return rows
}

export const getOrderById = async (userId: number, orderId: number) => {
  await expirePendingOrders()

  const orderQuery = await db.query(
    `
        SELECT
          *,
          created_at AS "createdAt",
          created_at + INTERVAL '1 hour' AS "paymentExpiresAt"
        FROM orders
        WHERE id = $1
        AND user_id = $2
        `,
    [orderId, userId],
  )

  const order = orderQuery.rows[0]

  if (!order) {
    return null
  }

  const itemsQuery = await db.query(
    `
    SELECT
        quantity,
        price,

        json_build_object(
            'id', product_id,
            'name', product_name,
            'image', product_image
        ) AS product

    FROM order_items
    WHERE order_id = $1
    `,
    [orderId],
  )

  return {
    ...order,
    items: itemsQuery.rows,
  }
}

export const payOrder = async (userId: number, orderId: number) => {
  await expirePendingOrders()

  const { rows } = await db.query(
    `
      UPDATE orders
      SET status = 'paid'
      WHERE id = $1
        AND user_id = $2
        AND status = 'pending'
        AND created_at > NOW() - INTERVAL '1 hour'
      RETURNING
        *,
        created_at AS "createdAt",
        created_at + INTERVAL '1 hour' AS "paymentExpiresAt"
    `,
    [orderId, userId],
  )

  if (!rows[0]) {
    throw new AppError(409, 'This order can no longer be paid')
  }

  return rows[0]
}
