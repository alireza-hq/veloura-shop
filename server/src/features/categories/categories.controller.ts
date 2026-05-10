import type { Request, Response } from 'express'

import {
    CategoryParamsSchema, createCategorySchema, updateCategorySchema
} from './categories.schema';
import * as service from './categories.service';

export const getCategories = async (_req: Request, res: Response) => {
  const categories = await service.getCategoryList()

  res.json(categories)
}

export const getCategory = async (req: Request, res: Response) => {
  const { id } = CategoryParamsSchema.parse(req.params)

  const category = await service.getCategoryById(id)

  if (!category) {
    return res.status(404).json({
      message: 'Category not found',
    })
  }

  res.json(category)
}

export const createCategory = async (req: Request, res: Response) => {
  const data = createCategorySchema.parse(req.body)

  const category = await service.createCategory(data)

  res.status(201).json(category)
}

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = CategoryParamsSchema.parse(req.params)

  const data = updateCategorySchema.parse(req.body)

  const category = await service.updateCategory(id, data)

  if (!category) {
    return res.status(404).json({
      message: 'Category not found',
    })
  }

  res.json(category)
}

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = CategoryParamsSchema.parse(req.params)

  const category = await service.deleteCategory(id)

  if (!category) {
    return res.status(404).json({
      message: 'Category not found',
    })
  }

  res.json({
    messsage: 'Deleted successfully',
  })
}
