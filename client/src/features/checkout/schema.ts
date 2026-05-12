import { z } from 'zod';

export const checkoutSchema = z.object({
  name: z.string().min(2, { message: 'Enter your name properly' }),
  address: z.string().min(8, { message: 'Address must be precise' }),
  phone: z.string().regex(/^\+?\d{10,15}/, { message: 'Invalid phone number' }),
})

export type CheckoutFormValues = z.infer<typeof checkoutSchema>
