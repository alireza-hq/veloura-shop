import { z } from 'zod'

export const subscribeSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
})
