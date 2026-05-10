import type { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../lib/jwt'

export const optionalAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader?.startsWith('Bearer ')) {
      return next()
    }

    const token = authHeader.split(' ')[1]

    const payload = verifyToken(token)

    req.user = payload

    next()
  } catch {
    next()
  }
}
