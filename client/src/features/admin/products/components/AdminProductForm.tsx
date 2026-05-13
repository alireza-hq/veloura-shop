'use client'

import { Loader2, PackagePlus, Save } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { Category } from '@/features/categories/types'
import { cn } from '@/lib/utils/cn'

import {
  ProductFormInput,
  ProductFormValues,
} from '../schemas/productFormSchema'

type Props = {
  form: UseFormReturn<ProductFormInput, unknown, ProductFormValues>
  categories: Category[]
  onSubmit: (data: ProductFormValues) => void
  isSubmitting: boolean
  mode: 'create' | 'edit'
}

export const AdminProductForm = ({
  form,
  categories,
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
        {mode === 'create' ? 'Create Product' : 'Edit Product'}
      </h2>

      <div className='grid gap-5 md:grid-cols-2'>
        <div className='md:col-span-2'>
          <label className='mb-1 block text-sm font-medium text-black/70 dark:text-white/70'>
            Image URL
          </label>
          <input
            type='url'
            placeholder='https://example.com/image.jpg'
            className={cn(inputClass, errors.image && 'border-red-600')}
            {...register('image')}
          />
          {errors.image && <ErrorMessage message={errors.image.message} />}
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium text-black/70 dark:text-white/70'>
            Name
          </label>
          <input
            type='text'
            placeholder='Product name'
            className={cn(inputClass, errors.name && 'border-red-600')}
            {...register('name')}
          />
          {errors.name && <ErrorMessage message={errors.name.message} />}
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium text-black/70 dark:text-white/70'>
            Category
          </label>
          <select
            className={cn(inputClass, errors.categoryId && 'border-red-600')}
            {...register('categoryId')}
          >
            <option value=''>Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <ErrorMessage message={errors.categoryId.message} />
          )}
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium text-black/70 dark:text-white/70'>
            Price
          </label>
          <input
            type='number'
            step='0.01'
            placeholder='99.99'
            className={cn(inputClass, errors.price && 'border-red-600')}
            {...register('price')}
          />
          {errors.price && <ErrorMessage message={errors.price.message} />}
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium text-black/70 dark:text-white/70'>
            Stock
          </label>
          <input
            type='number'
            placeholder='25'
            className={cn(inputClass, errors.stock && 'border-red-600')}
            {...register('stock')}
          />
          {errors.stock && <ErrorMessage message={errors.stock.message} />}
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium text-black/70 dark:text-white/70'>
            Rating
          </label>
          <input
            type='number'
            step='0.1'
            min='0'
            max='5'
            placeholder='4.5'
            className={cn(inputClass, errors.rating && 'border-red-600')}
            {...register('rating')}
          />
          {errors.rating && <ErrorMessage message={errors.rating.message} />}
        </div>

        <div className='md:col-span-2'>
          <label className='mb-1 block text-sm font-medium text-black/70 dark:text-white/70'>
            Description
          </label>
          <textarea
            rows={5}
            placeholder='Write product description...'
            className={cn(
              inputClass,
              'resize-none',
              errors.description && 'border-red-600',
            )}
            {...register('description')}
          />
          {errors.description && (
            <ErrorMessage message={errors.description.message} />
          )}
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
              <PackagePlus className='h-4 w-4' />
            ) : (
              <Save className='h-4 w-4' />
            )}
            {mode === 'create' ? 'Create Product' : 'Save Changes'}
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
