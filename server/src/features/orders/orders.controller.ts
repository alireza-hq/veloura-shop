import type { Request, Response } from 'express'
import * as service from './orders.service'
import { orderIdSchema } from './orders.schema'

export const createOrder = async (req: Request, res: Response) => {
  const order = await service.createOrder(req.user!.userId)

  res.status(201).json(order)
}

export const getOrders = async (req: Request, res: Response) => {
  const orders = await service.getOrderList(req.user!.userId)

  res.json(orders)
}

export const getOrder = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = orderIdSchema.parse({ params: req.params })
  const order = await service.getOrderById(req.user!.userId, id)

  if (!order) {
    return res.status(404).json({
      message: 'Order not found',
    })
  }

  res.json(order)
}

export const payOrder = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = orderIdSchema.parse({ params: req.params })
  const order = await service.payOrder(req.user!.userId, id)

  res.json(order)
}
