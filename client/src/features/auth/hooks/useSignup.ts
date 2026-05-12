import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { routes } from '@/lib/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { SignupFormValues, signupSchema } from '../schemas/signupSchema'
import { signupService } from '../services/authApi'
import { useAuthStore } from '../store/useAuthStore'

type SignupResponse = {
  user: {
    id: number
    username: string
    email: string
    role: 'user' | 'admin'
  }
}

export const useSignup = () => {
  const router = useRouter()

  const { setUser } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({ resolver: zodResolver(signupSchema) })

  const signupMutation = useMutation({
    mutationFn: signupService,

    onSuccess: (data: SignupResponse) => {
      setUser(data.user)

      router.push(routes.auth.me)
    },

    onError: (error) => {
      console.error(error)
    },
  })

  const onSubmit = async (data: SignupFormValues) => {
    signupMutation.mutate(data)
  }

  return {
    register,
    handleSubmit,
    onSubmit,

    errors,

    isPending: signupMutation.isPending,
    error: signupMutation.error,
  } as const
}
