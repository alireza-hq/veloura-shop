import { z } from 'zod';

export const productBaseSchema = z.object({
  image: z.string().url(),
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  categoryId: z.number().int(),
  stock: z.number().int().nonnegative(),
  rating: z.number().min(0).max(5),
})

export const createProductSchema = productBaseSchema

export const updateProductSchema = productBaseSchema.partial()

export const productParamsSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
})
