import { db } from '@/config/db';

export const getCheckout = async (userId: number) => {
  const cartQuery = await db.query(
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
    return {
      items: [],
      subtotal: 0,
      shipping: 0,
      tax: 0,
      total: 0,
    }
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

  return {
    items: items.map((item) => ({
      quantity: item.quantity,

      product: {
        id: item.id,
        name: item.name,
        image: item.image,
        price: Number(item.price),
      },
    })),

    subtotal,
    shipping,
    tax,
    total,
  }
}
