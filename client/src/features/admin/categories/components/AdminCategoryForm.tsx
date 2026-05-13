'use client'

import { Loader2, Save, Tags } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { cn } from '@/lib/utils/cn'

import { CategoryFormValues } from '../schemas/categoryFormSchema'

type Props = {
  form: UseFormReturn<CategoryFormValues>
  onSubmit: (data: CategoryFormValues) => void
  isSubmitting: boolean
  mode: 'create' | 'edit'
}

export const AdminCategoryForm = ({
  form,
  onSubmit,
  isSubmitting,
  mode,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className='rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-zinc-950'
    >
      <h2 className='mb-6 text-xl font-semibold text-black dark:text-white'>
        {mode === 'create' ? 'Create Category' : 'Edit Category'}
      </h2>

      <div className='space-y-5'>
        <div>
          <label className='mb-1 block text-sm font-medium text-black/70 dark:text-white/70'>
            Title
          </label>
          <input
            type='text'
            placeholder='Skincare'
            className={cn(inputClass, errors.title && 'border-red-600')}
            {...register('title')}
          />
          {errors.title && <ErrorMessage message={errors.title.message} />}
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium text-black/70 dark:text-white/70'>
            Image URL
          </label>
          <input
            type='url'
            placeholder='https://example.com/category.jpg'
            className={cn(inputClass, errors.image && 'border-red-600')}
            {...register('image')}
          />
          {errors.image && <ErrorMessage message={errors.image.message} />}
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium text-black/70 dark:text-white/70'>
            Description
          </label>
          <textarea
            rows={5}
            placeholder='Optional category description...'
            className={cn(inputClass, 'resize-none')}
            {...register('description')}
          />
        </div>
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className='mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-6 py-4 text-sm font-semibold text-white transition-all hover:opacity-90 active:opacity-85 disabled:opacity-70 sm:w-auto dark:bg-white dark:text-black'
      >
        {isSubmitting ? (
          <>
            <Loader2 className='h-4 w-4 animate-spin' />
            Saving...
          </>
        ) : (
          <>
            {mode === 'create' ? (
              <Tags className='h-4 w-4' />
            ) : (
              <Save className='h-4 w-4' />
            )}
            {mode === 'create' ? 'Create Category' : 'Save Changes'}
          </>
        )}
      </button>
    </form>
  )
}

const inputClass =
  'w-full rounded-xl border border-black/10 bg-zinc-50 px-4 py-3 text-sm text-black placeholder:text-black/30 focus:border-black focus:outline-none dark:border-white/10 dark:bg-black dark:text-white dark:placeholder:text-white/30 dark:focus:border-white'

const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null

  return <p className='mt-1 text-xs text-red-500'>{message}</p>
}
