import { z } from "zod";

export const getOrderSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive(),
    }),
});
