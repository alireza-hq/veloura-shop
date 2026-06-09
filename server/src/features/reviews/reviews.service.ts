import { db } from '@/config/db'

export const ensureReviewsTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS product_reviews (
      id SERIAL PRIMARY KEY,
      product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
      comment TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE(product_id, user_id)
    )
  `)
}

export const getProductReviews = async (productId: number) => {
  await ensureReviewsTable()
  const { rows } = await db.query(
    `
      SELECT
        r.id,
        r.rating,
        r.comment,
        r.created_at AS "createdAt",
        r.updated_at AS "updatedAt",
        json_build_object('id', u.id, 'username', u.username) AS user
      FROM product_reviews r
      JOIN users u ON u.id = r.user_id
      WHERE r.product_id = $1
      ORDER BY r.updated_at DESC
    `,
    [productId],
  )
  return rows
}

export const upsertProductReview = async (
  productId: number,
  userId: number,
  rating: number,
  comment: string,
) => {
  await ensureReviewsTable()
  await db.query(
    `
      INSERT INTO product_reviews (product_id, user_id, rating, comment)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (product_id, user_id)
      DO UPDATE SET rating = EXCLUDED.rating, comment = EXCLUDED.comment, updated_at = NOW()
    `,
    [productId, userId, rating, comment],
  )
  return getProductReviews(productId)
}
