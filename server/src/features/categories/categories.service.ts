import { db } from '../../config/db'

export const getCategoryList = async () => {
  const { rows } = await db.query('SELECT * FROM categories ORDER BY id DESC')

  return rows
}

export const getCategoryById = async (id: number) => {
  const { rows } = await db.query('SELECT * FROM categories WHERE id = $1', [
    id,
  ])

  return rows[0]
}

export const createCategory = async (data: any) => {
  const { title, image, description } = data

  const { rows } = await db.query(
    `INSERT INTO categories (title, image, description)
         VALUES ($1,$2,$3)
         RETURNING *`,
    [title, image, description],
  )

  return rows[0]
}

export const updateCategory = async (id: number, data: any) => {
  const fields = Object.keys(data)
  const values = Object.values(data)

  if (fields.length === 0) return null

  const setQuery = fields.map((field, i) => `${field} = $${i + 1}`).join(', ')

  const { rows } = await db.query(
    `UPDATE categories
     SET ${setQuery}
     WHERE id = $${fields.length + 1}
     RETURNING *`,
    [...values, id],
  )

  return rows[0]
}

export const deleteCategory = async (id: number) => {
  const { rows } = await db.query(
    `DELETE FROM categories
     WHERE id = $1
     RETURNING *`,
    [id],
  )

  return rows[0]
}
