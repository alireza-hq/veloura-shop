import { z } from 'zod'

export const reviewParamsSchema = z.object({
  productId: z.coerce.number().int().positive(),
})

export const reviewBodySchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().min(3).max(800),
})
