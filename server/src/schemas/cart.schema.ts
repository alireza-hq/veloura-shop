import { z } from "zod";

export const addCartItemSchema = z.object({
    params: z.object({
        productId: z.coerce.number().int().positive(),
    }),
    body: z.object({
        quantity: z.coerce.number().int().min(1).default(1),
    }),
});

export const updateCartItemSchema = z.object({
    params: z.object({
        productId: z.coerce.number().int().positive(),
    }),
    body: z.object({
        quantity: z.coerce.number().int().min(1),
    }),
});

export const deleteCartItemSchema = z.object({
    params: z.object({
        productId: z.coerce.number().int().positive(),
    }),
});
