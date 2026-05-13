import { api } from '@/lib/api/client'

import { Category } from '../types'
import { endpoints } from '@/lib/endpoints'

type CreateCategoryData = {
  title: string
  image: string
  description?: string
}

type UpdateCategoryData = Partial<CreateCategoryData>

export const getCategories = async () => {
  const { data } = await api.get<Category[]>(endpoints.categories.getCategories)
  return data
}

export const getCategory = async (id: number) => {
  const { data } = await api.get<Category>(endpoints.categories.getCategory(id))
  return data
}

export const createCategory = async (data: CreateCategoryData) => {
  const res = await api.post<Category>(
    endpoints.categories.createCategory,
    data,
  )

  return res.data
}

export const updateCategory = async (id: number, data: UpdateCategoryData) => {
  const res = await api.patch<Category>(
    endpoints.categories.updateCategory(id),
    data,
  )

  return res.data
}

export const deleteCategory = async (id: number) => {
  const { data } = await api.delete(endpoints.categories.deleteCategory(id))

  return data
}
