import { db } from '../../config/db';

export const getProductList = async () => {
  const { rows } = await db.query(`
    SELECT
    p.id,
    p.image,
    p.name,
    p.description,
    p.price,
    p.stock,
    p.rating,
    
    json_build_object(
      'id', c.id,
      'title', c.title,
      'image', c.image,
      'description', c.description
    ) AS category

    FROM products p
    
    LEFT JOIN categories c
      ON p.category_id = c.id
    
    ORDER BY id DESC
    `)
  return rows
}

export const getProductById = async (id: number) => {
  const { rows } = await db.query(
    `
    SELECT
    p.id,
    p.image,
    p.name,
    p.description,
    p.price,
    p.stock,
    p.rating,
    
    json_build_object(
      'id', c.id,
      'title', c.title,
      'image', c.image,
      'description', c.description
    ) AS category

    FROM products p
    
    LEFT JOIN categories c
      ON p.category_id = c.id
    
    WHERE p.id = $1
    `,
    [id],
  )
  return rows[0]
}

export const createProduct = async (data: any) => {
  const { image, name, description, price, category, stock, rating } = data

  const { rows } = await db.query(
    `INSERT INTO products (image, name, description, price, category, stock, rating)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING *`,
    [image, name, description, price, category, stock, rating],
  )

  return rows[0]
}

export const updateProduct = async (id: number, data: any) => {
  const fields = Object.keys(data)
  const values = Object.values(data)

  if (fields.length === 0) return null

  const setQuery = fields.map((field, i) => `${field} = $${i + 1}`).join(', ')

  const { rows } = await db.query(
    `UPDATE products
     SET ${setQuery}
     WHERE id = $${fields.length + 1}
     RETURNING *`,
    [...values, id],
  )

  return rows[0]
}

export const deleteProduct = async (id: number) => {
  const { rows } = await db.query(
    `DELETE FROM products WHERE id = $1 RETURNING *`,
    [id],
  )

  return rows[0]
}
