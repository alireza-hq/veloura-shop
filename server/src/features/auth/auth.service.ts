import { db } from '../../config/db';

export const findUserByEmail = async (email: string) => {
  const { rows } = await db.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ])

  return rows[0]
}

export const createUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const { rows } = await db.query(
    `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, username, email, role
        `,
    [username, email, password],
  )

  return rows[0]
}
