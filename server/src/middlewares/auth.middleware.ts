import type { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../lib/jwt'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized',
      })
    }

    const payload = verifyToken(token)

    req.user = payload

    next()
  } catch {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }
}
