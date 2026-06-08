'use client'

import { useCategories } from '@/features/categories/hooks/useCategories';
import { Hero } from '@/features/home/components/Hero';
import { HomeCategories } from '@/features/home/components/HomeCategories';
import { HomeProductList } from '@/features/home/components/HomeProductList';
import { HomeSection } from '@/features/home/components/HomeSection';
import { HomeSubscribe } from '@/features/home/components/HomeSubscribe';
import { HomeBenefits } from '@/features/home/components/HomeBenefits';

export default function Home() {
  const { data: categories } = useCategories()

  const topCats = categories?.slice(0, 3)
  const bottomCats = categories?.slice(3, 6)

  return (
    <main className='bg-dot-pattern relative min-h-screen dark:bg-black'>
      <Hero />

      <HomeSection className='relative z-10 -mt-12 pt-0'>
        <HomeBenefits />
      </HomeSection>

      <HomeSection
        eyebrow='Shop your ritual'
        title='Beauty, beautifully organized'
        description='Start with the feature, finish, or tool that inspires you today.'
      >
        <HomeCategories categories={topCats} />
      </HomeSection>

      <HomeSection
        eyebrow='Loved right now'
        title='Veloura favorites'
        description='The makeup essentials our community keeps coming back for.'
      >
        <HomeProductList />
      </HomeSection>

      <HomeSection
        eyebrow='Keep exploring'
        title='Complete your ritual'
        description='Thoughtful finishing touches for a routine that feels entirely yours.'
      >
        <HomeCategories categories={bottomCats} />
      </HomeSection>

      <HomeSection className='pt-8 pb-20 sm:pb-24'>
        <HomeSubscribe />
      </HomeSection>
    </main>
  )
}
