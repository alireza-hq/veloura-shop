import z from 'zod'

export const orderStatusSchema = z.enum([
  'pending',
  'paid',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
])

export const orderIdSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
})
