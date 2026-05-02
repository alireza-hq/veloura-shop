import { z } from "zod";

export const listProductsSchema = z.object({
    query: z.object({
        category: z.string().trim().min(1).optional(),
        q: z.string().trim().min(1).max(100).optional(),
    }),
});

export const getProductSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
});

export const createProductSchema = z.object({
    body: z.object({
        image: z.string().trim().min(1),
        title: z.string().trim().min(1),
        description: z.string().trim().min(1),
        price: z.coerce.number().positive(),
        categoryId: z.coerce.number().optional(),
    }),
});

export const updateProductSchema = z.object({
    body: z
        .object({
            image: z.string().trim().min(1).optional(),
            title: z.string().trim().min(1).optional(),
            description: z.string().trim().min(1).optional(),
            price: z.coerce.number().positive().optional(),
            categoryId: z.coerce.number().optional(),
        })
        .refine((data) => Object.keys(data).length > 0, {
            message: "At least one field must be provided",
        }),
    params: z.object({
        id: z.coerce.number(),
    }),
});

export const deleteProductSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
});
