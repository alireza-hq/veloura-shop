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

export const getAdminUsers = async (req: Request, res: Response) => {
  const users = await adminService.getAdminUsers()

  res.json(users)
}

export const updateUserRole = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { role } = req.body

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({
      message: 'Invalid role',
    })
  }

  const user = await adminService.updateUserRole(id, role)

  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    })
  }

  res.json(user)
}
