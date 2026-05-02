import { z } from "zod";

export const signupSchema = z.object({
    body: z.object({
        name: z.string().trim().min(1, "name is required"),
        email: z.string().trim().toLowerCase().email("invalid email"),
        password: z.string().min(8, "password must be at least 8 characters"),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().trim().toLowerCase().email("invalid email"),
        password: z.string(),
    }),
});
