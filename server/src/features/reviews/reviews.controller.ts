import type { Request, Response } from 'express'

import { reviewBodySchema, reviewParamsSchema } from './reviews.schema'
import * as service from './reviews.service'

export const getReviews = async (req: Request, res: Response) => {
  const { productId } = reviewParamsSchema.parse(req.params)
  res.json(await service.getProductReviews(productId))
}

export const saveReview = async (req: Request, res: Response) => {
  const { productId } = reviewParamsSchema.parse(req.params)
  const { rating, comment } = reviewBodySchema.parse(req.body)
  const reviews = await service.upsertProductReview(
    productId,
    req.user!.userId,
    rating,
    comment,
  )
  res.status(201).json(reviews)
}
