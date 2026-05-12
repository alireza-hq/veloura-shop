import { useRouter } from 'next/navigation'
import { useAuthStore } from '../store/useAuthStore'
import { useForm } from 'react-hook-form'
import { LoginFormValues, loginSchema } from '../schemas/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { loginService } from '../services/authApi'
import { routes } from '@/lib/routes'

type LoginResponse = {
  user: {
    id: number
    username: string
    email: string
    role: 'user' | 'admin'
  }
}

export const useLogin = () => {
  const router = useRouter()

  const { setUser } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) })

  const loginMutation = useMutation({
    mutationFn: loginService,

    onSuccess: (data: LoginResponse) => {
      setUser(data.user)

      router.push(routes.auth.me)
    },

    onError: (error) => {
      console.error(error)
    },
  })

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data)
  }

  return {
    register,
    handleSubmit,
    onSubmit,

    errors,

    isPending: loginMutation.isPending,
    error: loginMutation.error,
  } as const
}
