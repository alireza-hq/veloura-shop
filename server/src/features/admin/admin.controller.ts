import { Request, Response } from 'express'

import * as adminService from './admin.service'

export const getAdminStats = async (req: Request, res: Response) => {
  const stats = await adminService.getAdminStats()

  res.json(stats)
}
