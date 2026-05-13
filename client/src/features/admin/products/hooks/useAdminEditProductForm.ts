'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useProduct } from '@/features/products/hooks/useProduct'
import { useUpdateProduct } from '@/features/products/hooks/useUpdateProduct'
import { routes } from '@/lib/routes'

import {
  ProductFormInput,
  ProductFormValues,
  productFormSchema,
} from '../schemas/productFormSchema'

export const useAdminEditProductForm = (id: number) => {
  const router = useRouter()

  const { data: product, isLoading } = useProduct(id)

  const updateProduct = useUpdateProduct()

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

  useEffect(() => {
    if (!product) return

    form.reset({
      image: product.image,
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.category.id,
      stock: product.stock,
      rating: product.rating,
    })
  }, [product, form])

  const onSubmit = (data: ProductFormValues) => {
    updateProduct.mutate(
      {
        id,
        data,
      },
      {
        onSuccess: () => {
          router.push(routes.admin.products.root)
        },
      },
    )
  }

  return {
    form,
    product,
    isLoading,
    onSubmit,
    isSubmitting: updateProduct.isPending,
  } as const
}
