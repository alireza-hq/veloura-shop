import type { Request, Response } from 'express'
import * as service from './users.service'

export const getUsers = async (req: Request, res: Response) => {
  const users = await service.getUserList()

  res.json(users)
}

export const getUser = async (req: Request, res: Response) => {
  const user = await service.getUserById(req.user!.userId)

  res.json(user)
}
