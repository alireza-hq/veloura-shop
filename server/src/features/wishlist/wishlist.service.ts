import { db } from '@/config/db'

export const getWishlist = async (userId: number) => {
  const { rows } = await db.query(
    `
        SELECT
            p.id,
            p.name,
            p.description,
            p.image,
            p.price,
            p.stock,
            p.rating,

            json_build_object(
            'id', c.id,
            'title', c.title,
            'image', c.image,
            'description', c.description
            ) AS category

        FROM wishlist_items wi

        JOIN products p
          ON wi.product_id = p.id

        JOIN categories c
          ON p.category_id = c.id

        WHERE wi.user_id = $1

        ORDER BY wi.id DESC
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
