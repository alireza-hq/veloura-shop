'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils/cn'

type Props = {
  images: string[]
  duration: number
  fadeDuration: number
  className: string
}

export const BackgroundSlideshow = ({
  images,
  duration = 4000,
  fadeDuration = 1,
  className = '',
}: Props) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [images])

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, duration)
    return () => clearInterval(timer)
  }, [images.length, duration])

  return (
    <div className={cn('absolute inset-0', className)}>
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: fadeDuration }}
          className='absolute inset-0 bg-cover bg-center'
          style={{
            backgroundImage: `url(${images[index]})`,
          }}
        />
      </AnimatePresence>
    </div>
  )
}
