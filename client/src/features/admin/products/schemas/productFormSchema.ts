import { z } from 'zod'

export const productFormSchema = z.object({
  image: z.string().url({ message: 'Enter a valid image URL' }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  description: z
    .string()
    .min(8, { message: 'Description is too short' })
    .or(z.literal('')),

  price: z.coerce.number().positive({ message: 'Price must be positive' }),
  categoryId: z.coerce.number().int().positive({
    message: 'Select a category',
  }),
  stock: z.coerce.number().int().nonnegative({
    message: 'Stock cannot be negative',
  }),
})

export type ProductFormInput = z.input<typeof productFormSchema>
export type ProductFormValues = z.output<typeof productFormSchema>
