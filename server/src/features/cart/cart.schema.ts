import z from 'zod';

export const addCartItemSchema = z.object({
  body: z.object({
    productId: z.number().int(),
    quantity: z.number().int().positive(),
  }),
})

export const updateCartItemSchema = z.object({
  body: z.object({
    quantity: z.number().int().positive(),
  }),

  params: z.object({
    productId: z.coerce.number(),
  }),
})

export const cartItemParamsSchema = z.object({
  params: z.object({
    productId: z.coerce.number(),
  }),
})
