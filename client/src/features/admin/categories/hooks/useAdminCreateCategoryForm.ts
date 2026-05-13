'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useCreateCategory } from '@/features/categories/hooks/useCreateCategory'
import { routes } from '@/lib/routes'

import {
  CategoryFormValues,
  categoryFormSchema,
} from '../schemas/categoryFormSchema'

export const useAdminCreateCategoryForm = () => {
  const router = useRouter()

  const createCategory = useCreateCategory()

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      title: '',
      image: '',
      description: '',
    },
  })

  const onSubmit = (data: CategoryFormValues) => {
    createCategory.mutate(data, {
      onSuccess: () => {
        router.push(routes.admin.categories.root)
      },
    })
  }

  return {
    form,
    onSubmit,
    isSubmitting: createCategory.isPending,
  } as const
}
