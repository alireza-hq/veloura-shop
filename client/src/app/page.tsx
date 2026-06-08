'use client'

import { useCategories } from '@/features/categories/hooks/useCategories';
import { Hero } from '@/features/home/components/Hero';
import { HomeCategories } from '@/features/home/components/HomeCategories';
import { HomeProductList } from '@/features/home/components/HomeProductList';
import { HomeSection } from '@/features/home/components/HomeSection';
import { HomeSubscribe } from '@/features/home/components/HomeSubscribe';

export default function Home() {
  const { data: categories } = useCategories()

  const topCats = categories?.slice(0, 3)
  const bottomCats = categories?.slice(3, 6)

  return (
    <main className='bg-dot-pattern relative min-h-screen dark:bg-black'>
      <Hero />

      <HomeSection>
        <HomeCategories categories={topCats} />
      </HomeSection>

      <HomeSection title='Veloura favorites'>
        <HomeProductList />
      </HomeSection>

      <HomeSection title='Complete your ritual'>
        <HomeCategories categories={bottomCats} />
      </HomeSection>

      <HomeSection className='border-t border-black/3 backdrop-blur-xs'>
        <HomeSubscribe />
      </HomeSection>
    </main>
  )
}
