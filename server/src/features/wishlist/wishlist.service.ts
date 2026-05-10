import { db } from '@/config/db'

export const getWishlist = async (userId: number) => {
  const { rows } = await db.query(
    `
        SELECT
            p.id,
            p.name,
            p.image,
            p.price,
            p.rating
        FROM wishlist_items w
        JOIN products p
            ON p.id = w.product_id
        WHERE w.user_id = $1
        ORDER BY w.created_at DESC
        `,
    [userId],
  )

  return rows
}

export const addToWishlist = async (userId: number, productId: number) => {
  await db.query(
    `
        INSERT INTO wishlist_items (user_id, product_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, product_id)
        DO NOTHING
        `,
    [userId, productId],
  )

  return getWishlist(userId)
}

export const removeFromWishlist = async (userId: number, productId: number) => {
  await db.query(
    `
        DELETE FROM wishlist_items
        WHERE user_id = $1
        AND product_id = $2
        `,
    [userId, productId],
  )

  return getWishlist(userId)
}
