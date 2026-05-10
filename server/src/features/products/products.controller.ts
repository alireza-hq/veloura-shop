import type { Request, Response } from 'express'
import { createProductSchema, productParamsSchema, updateProductSchema } from './products.schema';
import * as service from './products.service';

export const getProducts = async (_req: Request, res: Response) => {
  const products = await service.getProductList()
  res.json(products)
}

export const getProduct = async (req: Request, res: Response) => {
  const { id } = productParamsSchema.parse(req.params)

  const product = await service.getProductById(id)

  if (!product) return res.status(404).json({ message: 'Product not found' })

  res.json(product)
}

export const createProduct = async (req: Request, res: Response) => {
  const data = createProductSchema.parse(req.body)

  const product = await service.createProduct(data)

  res.status(201).json(product)
}

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = productParamsSchema.parse(req.params)
  const data = updateProductSchema.parse(req.body)

  const product = await service.updateProduct(id, data)

  if (!product) return res.status(404).json({ message: 'Product not found' })

  res.json(product)
}

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = productParamsSchema.parse(req.params)

  const product = await service.deleteProduct(id)

  if (!product) return res.status(404).json({ message: 'Product not found' })

  res.json({ message: 'Deleted successfully' })
}
