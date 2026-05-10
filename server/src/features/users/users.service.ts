import { db } from '@/config/db';

export const getUserList = async () => {
  const { rows } = await db.query(
    `
        SELECT
            id,
            username,
            email,
            role,
            created_at AS "createdAt"
        FROM users
        `,
  )

  return rows
}

export const getUserById = async (id: number) => {
  const { rows } = await db.query(
    `
        SELECT
            id,
            username,
            email,
            role,
            created_at AS "createdAt"
        FROM users
        WHERE id = $1
        `,
    [id],
  )

  return rows[0]
}
