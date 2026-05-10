import type { Request, Response } from 'express'
import * as service from './cart.service'

export const getCart = async (req: Request, res: Response) => {
  const cart = await service.getCart(req.user!.userId)

  res.json(cart)
}
