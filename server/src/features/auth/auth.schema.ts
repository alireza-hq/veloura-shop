import z, { email } from 'zod'

export const signupSchema = z
  .object({
    username: z.string().min(3),
    email: z.email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
})
