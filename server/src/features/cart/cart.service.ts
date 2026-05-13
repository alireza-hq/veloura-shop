import { db } from '@/config/db'

export const getOrCreateCart = async (userId: number) => {
  const existingCart = await db.query(
    `
        SELECT * FROM carts
        WHERE user_id = $1
        `,
    [userId],
  )

  if (existingCart.rows[0]) {
    return existingCart.rows[0]
  }

  const newCart = await db.query(
    `
    INSERT INTO carts (user_id)
    VALUES ($1)
    RETURNING *
    `,
    [userId],
  )

  return newCart.rows[0]
}

export const getCart = async (userId: number) => {
  const cart = await getOrCreateCart(userId)

  const { rows } = await db.query(
    `
        SELECT
            ci.quantity,

            json_build_object(
                'id', p.id,
                'name', p.name,
                'image', p.image,
                'price', p.price
            ) AS product

        FROM cart_items ci

        JOIN products p
            ON ci.product_id = p.id

        WHERE ci.cart_id = $1
        `,
    [cart.id],
  )

  return {
    id: cart.id,
    items: rows,
  }
}

export const addCartItem = async (
  userId: number,
  productId: number,
  quantity: number,
) => {
  const cart = await getOrCreateCart(userId)

  const existingItem = await db.query(
    `
        SELECT * FROM cart_items
        WHERE cart_id = $1
        AND product_id = $2
        `,
    [cart.id, productId],
  )

  if (existingItem.rows[0]) {
    await db.query(
      `
        UPDATE cart_items
        SET quantity = quantity + $1
        WHERE cart_id = $2
        AND product_id = $3
        `,
      [quantity, cart.id, productId],
    )
  } else {
    await db.query(
      `
  INSERT INTO cart_items (
    cart_id,
    product_id,
    quantity
  )
  VALUES ($1, $2, $3)
  `,
      [cart.id, productId, quantity],
    )
  }

  return getCart(userId)
}

export const updateCartItem = async (
  userId: number,
  productId: number,
  quantity: number,
) => {
  const cart = await getOrCreateCart(userId)

  await db.query(
    `
        UPDATE cart_items
        SET QUANTITY = $1
        WHERE cart_id = $2
        AND product_id = $3
        `,
    [quantity, cart.id, productId],
  )

  return getCart(userId)
}

export const removeCartItem = async (userId: number, productId: number) => {
  const cart = await getOrCreateCart(userId)

  await db.query(
    `
    DELETE FROM cart_items
    WHERE cart_id = $1
    AND product_id = $2
    `,
    [cart.id, productId],
  )

  return getCart(userId)
}
