import { api } from '@/lib/api/client'
import { endpoints } from '@/lib/endpoints'

import { Product } from '../types'

export type CreateProductData = {
  image: string
  name: string
  description: string
  price: number
  categoryId: number
  stock: number
  rating?: number
}

export type UpdateProductData = Partial<CreateProductData>

export const getProductsService = async () => {
  const { data } = await api.get<Product[]>(endpoints.products.getProducts)
  return data
}

export const searchProductsService = async (query: string, limit = 5) => {
  const { data } = await api.get<Product[]>(endpoints.products.getProducts, {
    params: { q: query, limit },
  })
  return data
}

export const getProductService = async (id: number) => {
  const { data } = await api.get<Product>(endpoints.products.getProduct(id))
  return data
}

export const createProductService = async (data: CreateProductData) => {
  const res = await api.post<Product>(endpoints.products.createProduct, data)

  return res.data
}

export const updateProductService = async (
  id: number,
  data: UpdateProductData,
) => {
  const res = await api.put<Product>(endpoints.products.updateProduct(id), data)

  return res.data
}

export const deleteProductService = async (id: number) => {
  const { data } = await api.delete(endpoints.products.deleteProduct(id))

  return data
}
