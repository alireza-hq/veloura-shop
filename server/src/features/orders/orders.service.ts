import { db } from '@/config/db';

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
            ON ci.cart_item = c.id

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

      // clear cart
      await client.query(
        `
        DELETE FROM cart_items
        WHERE cart_id IN (
            SELECT id FROM carts
            WHERE user_id = $1
        )
        `,
        [userId],
      )

      await client.query('COMMIT')

      return order
    }
  } catch (err) {
    await client.query('ROLLBACK')

    throw err
  } finally {
    client.release()
  }
}

export const getOrderList = async (userId: number) => {
  const { rows } = await db.query(
    `
        SELECT *
        FROM orders
        WHERE user_id = $1
        ORDER BY created_at DESC
        `,
    [userId],
  )

  return rows
}

export const getOrderById = async (userId: number, orderId: number) => {
  const orderQuery = await db.query(
    `
        SELECT *
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
            'image', product_image,
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
