import z from 'zod';

export const categoryBaseSchema = z.object({
  title: z.string().min(1),
  image: z.string(),
  description: z.string().optional(),
})

export const createCategorySchema = categoryBaseSchema

export const updateCategorySchema = categoryBaseSchema.partial()

export const CategoryParamsSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
})
