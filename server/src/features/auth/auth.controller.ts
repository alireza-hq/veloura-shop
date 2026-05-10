import type { Request, Response } from 'express'
import { comparePassword, hashPassword } from '../../lib/hash';
import { signToken } from '../../lib/jwt';
import { loginSchema, signupSchema } from './auth.schema';
import * as service from './auth.service';

export const signup = async (req: Request, res: Response) => {
  const data = signupSchema.parse(req.body)

  const existingUser = await service.findUserByEmail(data.email)

  if (existingUser) {
    return res.status(409).json({
      message: 'Email already in use',
    })
  }

  const hashedPassword = await hashPassword(data.password)

  const user = await service.createUser(
    data.username,
    data.email,
    hashedPassword,
  )

  const token = signToken({ userId: user.id, role: user.role })

  res
    .status(201)
    .cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      user,
    })
}

export const login = async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body)

  const user = await service.findUserByEmail(data.email)

  if (!user) {
    return res.status(401).json({
      message: 'Invalid credentials',
    })
  }

  const isPasswordValid = await comparePassword(data.password, user.password)

  if (!isPasswordValid) {
    return res.status(401).json({
      message: 'Invalid credentials',
    })
  }

  const token = signToken({ userId: user.id, role: user.role })

  res
    .cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      user,
    })
}

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token')

  res.json({
    message: 'Logged out',
  })
}
