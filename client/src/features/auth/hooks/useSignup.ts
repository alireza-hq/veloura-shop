import { routes } from '@/lib/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { LoginFormValues } from '../schemas/loginSchema'
import { SignupFormValues, signupSchema } from '../schemas/signupSchema'
import { useAuthStore } from '../store/useAuthStore'

export const useSignup = () => {
  const router = useRouter()
  const { login } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignupFormValues>({ resolver: zodResolver(signupSchema) })

  const onSubmit = async (data: LoginFormValues) => {
    console.log(data)
    await login(data.email, data.password)
    router.push(routes.auth.me)
  }

  return { register, onSubmit, handleSubmit, isSubmitting, errors } as const
}
