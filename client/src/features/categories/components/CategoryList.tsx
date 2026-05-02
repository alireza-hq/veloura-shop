'use client'

import { CategoryCard } from '@/features/categories/components/CategoryCard'

import { Category } from '../types'

type Props = {
  categories: Category[]
}

export const CategoryList = ({ categories }: Props) => {
  return (
    <div className='grid grid-cols-2 gap-4 py-4 sm:py-8 lg:grid-cols-3'>
      {categories.map((category) => (
        <CategoryCard key={category.id} {...category} />
      ))}
    </div>
  )
}
