'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { LoginFormValues, loginSchema } from '../schemas/loginSchema'
import { useAuthStore } from '../store/useAuthStore'
import { routes } from '@/lib/routes'

export const useLogin = () => {
  const router = useRouter()
  const { login } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (data: LoginFormValues) => {
    const { data: res } = await axios.post('api2/auth/login', data)
    login(res.user)
    router.push(routes.auth.me)
  }

  return { register, onSubmit, handleSubmit, isSubmitting, errors } as const
}
