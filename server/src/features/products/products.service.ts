import { db } from '../../config/db'

type ProductListQuery = {
  q?: string
  limit?: number
}

export const getProductList = async ({
  q,
  limit = 50,
}: ProductListQuery = {}) => {
  const search = q?.trim()
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

    WHERE (
      $1::text IS NULL
      OR p.name ILIKE '%' || $1 || '%'
      OR p.description ILIKE '%' || $1 || '%'
      OR c.title ILIKE '%' || $1 || '%'
    )

    ORDER BY
      CASE WHEN $1::text IS NOT NULL AND p.name ILIKE $1 || '%' THEN 0 ELSE 1 END,
      p.id DESC
    LIMIT $2
    `,
    [search || null, limit],
  )
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

type ProductInput = {
  image: string
  name: string
  description?: string
  price: number
  categoryId: number
  stock: number
  rating: number
}

export const createProduct = async (data: ProductInput) => {
  const { image, name, description, price, categoryId, stock, rating } = data

  const { rows } = await db.query(
    `INSERT INTO products (image, name, description, price, category_id, stock, rating)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING *`,
    [image, name, description, price, categoryId, stock, rating],
  )

  return rows[0]
}

const columnMap: Record<string, string> = {
  image: 'image',
  name: 'name',
  description: 'description',
  price: 'price',
  categoryId: 'category_id',
  stock: 'stock',
  rating: 'rating',
}

export const updateProduct = async (id: number, data: Partial<ProductInput>) => {
  const fields = (Object.keys(data) as Array<keyof ProductInput>).filter(
    (key) => data[key] !== undefined,
  )

  if (fields.length === 0) return null

  const setQuery = fields
    .map((field, index) => `${columnMap[field]} = $${index + 1}`)
    .join(', ')

  const values = fields.map((field) => data[field])

  const { rows } = await db.query(
    `
    UPDATE products
    SET ${setQuery}
    WHERE id = $${fields.length + 1}
    RETURNING *
    `,
    [...values, id],
  )

  if (!rows[0]) return null

  return getProductById(id)
}

export const deleteProduct = async (id: number) => {
  const { rows } = await db.query(
    `DELETE FROM products WHERE id = $1 RETURNING *`,
    [id],
  )

  return rows[0]
}
