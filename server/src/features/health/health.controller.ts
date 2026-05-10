import dayjs from 'dayjs'
import type { Request, Response } from 'express'

export const healthCheck = (_req: Request, res: Response) => {
  return res.status(200).json({
    status: 'ok',
    uptime: Math.round(process.uptime()),
    timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  })
}
