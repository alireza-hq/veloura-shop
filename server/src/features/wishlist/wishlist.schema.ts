import z from 'zod'

export const wishlistItemSchema = z.object({
  body: z.object({
    productId: z.number().int().positive(),
  }),
})

export const wishlistParamsSchema = z.object({
  params: z.object({
    productId: z.coerce.number().int().positive(),
  }),
})
