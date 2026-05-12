import { api } from '@/lib/api/client'
import { endpoints } from '@/lib/endpoints'

import { LoginFormValues } from '../schemas/loginSchema'
import { SignupFormValues } from '../schemas/signupSchema'

export const loginService = async (data: LoginFormValues) => {
  const res = await api.post(endpoints.auth.login, data)

  return res.data
}

export const signupService = async (data: SignupFormValues) => {
  const res = await api.post(endpoints.auth.signup, data)

  return res.data
}

export const logoutService = async () => {
  const res = await api.post(endpoints.auth.logout)

  return res.data
}

export const getCurrentUserService = async () => {
  const res = await api.get(endpoints.auth.me)

  return res.data
}
