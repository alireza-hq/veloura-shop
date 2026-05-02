import { z } from "zod";

export const createCategorySchema = z.object({
    body: z.object({
        name: z.string().trim().min(1),
    }),
});

export const getCategorySchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
});
