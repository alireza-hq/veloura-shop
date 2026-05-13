import z from 'zod'

export const categoryFormSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters' }),
  image: z.string({ message: 'Enter a valid image URL' }),
  description: z.string().optional(),
})

export type CategoryFormValues = z.infer<typeof categoryFormSchema>
