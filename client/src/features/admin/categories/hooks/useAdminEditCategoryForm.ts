'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useCategory } from '@/features/categories/hooks/useCategory'
import { useUpdateCategory } from '@/features/categories/hooks/useUpdateCategory'
import { routes } from '@/lib/routes'

import {
  CategoryFormValues,
  categoryFormSchema,
} from '../schemas/categoryFormSchema'

export const useAdminEditCategoryForm = (id: number) => {
  const router = useRouter()

  const { data: category, isLoading } = useCategory(id)

  const updateCategory = useUpdateCategory()

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      title: '',
      image: '',
      description: '',
    },
  })

  useEffect(() => {
    if (!category) return

    form.reset({
      title: category.title,
      image: category.image,
      description: category.description ?? '',
    })
  }, [category, form])

  const onSubmit = (data: CategoryFormValues) => {
    updateCategory.mutate(
      {
        id,
        data,
      },
      {
        onSuccess: () => {
          router.push(routes.admin.categories.root)
        },
      },
    )
  }

  return {
    form,
    category,
    isLoading,
    onSubmit,
    isSubmitting: updateCategory.isPending,
  } as const
}
