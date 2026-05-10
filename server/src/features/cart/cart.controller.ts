import type { Request, Response } from 'express'
import { addCartItemSchema, cartItemParamsSchema, updateCartItemSchema } from './cart.schema';
import * as service from './cart.service';

export const getCart = async (req: Request, res: Response) => {
  const cart = await service.getCart(req.user!.userId)

  res.json(cart)
}

export const addCartItem = async (req: Request, res: Response) => {
  const {
    body: { productId, quantity },
  } = addCartItemSchema.parse({
    body: req.body,
  })

  const cart = await service.addCartItem(req.user!.userId, productId, quantity)

  res.status(201).json(cart)
}

export const updateCartItem = async (req: Request, res: Response) => {
  const {
    body: { quantity },
    params: { productId },
  } = updateCartItemSchema.parse({
    body: req.body,
    params: req.params,
  })

  const cart = await service.updateCartItem(
    req.user!.userId,
    productId,
    quantity,
  )

  res.json(cart)
}

export const removeCartItem = async (req: Request, res: Response) => {
  const {
    params: { productId },
  } = cartItemParamsSchema.parse({ params: req.params })

  const cart = await service.removeCartItem(req.user!.userId, productId)

  res.json(cart)
}
