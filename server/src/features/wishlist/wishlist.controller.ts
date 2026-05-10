import type { Request, Response } from 'express'
import { wishlistItemSchema, wishlistParamsSchema } from './wishlist.schema'
import * as service from './wishlist.service'

export const getWishlist = async (req: Request, res: Response) => {
  const items = await service.getWishlist(req.user!.userId)

  res.json(items)
}

export const addToWishlist = async (req: Request, res: Response) => {
  const {
    body: { productId },
  } = wishlistItemSchema.parse({
    body: req.body,
  })

  const items = await service.addToWishlist(req.user!.userId, productId)

  res.status(201).json(items)
}

export const removeFromWishlist = async (req: Request, res: Response) => {
  const {
    params: { productId },
  } = wishlistParamsSchema.parse({
    params: req.params,
  })

  const items = await service.removeFromWishlist(req.user!.userId, productId)

  res.json(items)
}
