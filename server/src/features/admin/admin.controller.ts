import { Request, Response } from 'express'

import * as adminService from './admin.service'

export const getAdminStats = async (req: Request, res: Response) => {
  const stats = await adminService.getAdminStats()

  res.json(stats)
}

export const getAdminOrders = async (req: Request, res: Response) => {
  const orders = await adminService.getAdminOrders()

  res.json(orders)
}

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params
  const { status } = req.body

  const order = await adminService.updateOrderStatus(Number(id), status)

  if (!order) {
    return res.status(404).json({
      message: 'Order not found',
    })
  }

  res.json(order)
}
