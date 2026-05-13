'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useCreateProduct } from '@/features/products/hooks/useCreateProduct'
import { routes } from '@/lib/routes'

import {
  ProductFormInput,
  ProductFormValues,
  productFormSchema,
} from '../schemas/productFormSchema'

export const useAdminCreateProductForm = () => {
  const router = useRouter()

  const createProduct = useCreateProduct()

  const form = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      image: '',
      name: '',
      description: '',
      price: 0,
      categoryId: 0,
      stock: 0,
      rating: 0,
    },
  })

  const onSubmit = (data: ProductFormValues) => {
    createProduct.mutate(data, {
      onSuccess: () => {
        router.push(routes.admin.products.root)
      },
    })
  }

  return {
    form,
    onSubmit,
    isSubmitting: createProduct.isPending,
  } as const
}
