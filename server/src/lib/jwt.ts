import jwt, { Jwt } from 'jsonwebtoken'
import { env } from '../config/env'

export type JwtPayload = {
  userId: number
  role: 'user' | 'admin'
}

const SECRET = env.JWT_SECRET

export const signToken = (payload: JwtPayload) => {
  return jwt.sign(payload, SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  })
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET) as JwtPayload
}
