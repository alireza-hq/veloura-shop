import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  email: z.email('Please enter a valid email address'),
  subject: z.enum(['order', 'shade', 'partnership', 'other']),
  message: z
    .string()
    .trim()
    .min(15, 'Please share a little more detail')
    .max(1000, 'Please keep your message under 1000 characters'),
})

export type ContactFormValues = z.infer<typeof contactSchema>
