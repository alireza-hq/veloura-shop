import type { Request, Response } from 'express'
import { prisma } from '../db/prisma'
import { AppError } from '../middlewares/error.middleware'
import { Prisma } from '../generated/prisma/client'
import { ProductWhereInput } from '../generated/prisma/models'

export const listProducts = async (req: Request, res: Response) => {
  let where: ProductWhereInput = {}
  const slug = req.query.category as string
  const q = req.query.q as string

  if (slug) where = { ...where, category: { slug } }
  if (q)
    where = {
      ...where,
      OR: [
        { title: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
      ],
    }

  const products = await prisma.product.findMany({
    select: {
      id: true,
      image: true,
      title: true,
      description: true,
      price: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  return res.json(products)
}

export const getProduct = async (req: Request, res: Response) => {
  const id = req.params.id as unknown as number

  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      image: true,
      title: true,
      description: true,
      price: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  if (!product) throw new AppError(404, 'Product not found')

  return res.json(product)
}

export const createProduct = async (req: Request, res: Response) => {
  const { image, title, description, price, categoryId } = req.body

  if (categoryId !== undefined) {
    const exists = await prisma.category.findUnique({
      where: { id: categoryId },
      select: { id: true },
    })

    if (!exists) throw new AppError(404, 'Category not found')
  }

  const product = await prisma.product.create({
    data: {
      image,
      title,
      description,
      price,
      userId: req.user!.id,
      categoryId,
    },
    select: {
      id: true,
      image: true,
      title: true,
      description: true,
      price: true,
      categoryId: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  return res.status(201).json({ product })
}

export const updateProduct = async (req: Request, res: Response) => {
  const id = req.params.id as unknown as number

  try {
    const categoryId = req.body.categoryId

    if (categoryId !== undefined) {
      const exists = await prisma.category.findUnique({
        where: { id: categoryId },
        select: { id: true },
      })

      if (!exists) throw new AppError(404, 'Category not found')
    }
    const product = await prisma.product.update({
      where: { id, userId: req.user!.id },
      data: req.body,
      select: {
        id: true,
        image: true,
        title: true,
        description: true,
        price: true,
        categoryId: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return res.status(200).json({ product })
  } catch (err: unknown) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        throw new AppError(
          404,
          'Product not found or you do not have permission',
        )
      }
    }
    throw err
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id as unknown as number

  try {
    await prisma.product.delete({ where: { id, userId: req.user!.id } })

    return res.status(204).send()
  } catch (err: unknown) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        throw new AppError(
          404,
          'Product not found or you do not have permission',
        )
      }
    }
    throw err
  }
}
