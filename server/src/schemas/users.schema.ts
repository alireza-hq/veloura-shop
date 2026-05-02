import { z } from "zod";

export const getUserSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
});

export const updateUserSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
    body: z
        .object({
            name: z.string().trim().min(1).optional(),
            email: z.string().trim().toLowerCase().email("invalid email").optional(),
        })
        .refine((data) => Object.keys(data).length > 0, {
            message: "At least one field must be provided",
        }),
});

export const deleteUserSchema = z.object({
    params: z.object({
        id: z.coerce.number(),
    }),
});