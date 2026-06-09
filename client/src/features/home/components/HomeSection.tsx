 'use client'

import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

import { cn } from '@/lib/utils/cn';

type Props = {
  title?: string
  eyebrow?: string
  description?: string
  children: React.ReactNode
  className?: string
}

export const HomeSection = ({
  title,
  eyebrow,
  description,
  children,
  className,
}: Props) => {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 0.45, 1], [45, 0, -22])
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.55, 1, 1, 0.82])

  return (
    <motion.section
      ref={ref}
      style={reduceMotion ? undefined : { y, opacity }}
      className={cn('px-4 py-14 will-change-transform sm:px-8 sm:py-18 lg:px-12 lg:py-20', className)}
    >
      <div className='mx-auto max-w-7xl'>
      {title && (
        <div className='mb-8 grid items-end gap-5 sm:mb-10 lg:grid-cols-[minmax(0,1fr)_minmax(12rem,0.55fr)]'>
          <div className='max-w-2xl'>
          {eyebrow && (
            <p className='mb-3 text-xs font-semibold tracking-[0.22em] text-black/45 uppercase dark:text-white/45'>
              {eyebrow}
            </p>
          )}
          <h2 className='text-3xl font-semibold tracking-tight text-black sm:text-4xl dark:text-white'>
            {title}
          </h2>
          {description && (
            <p className='mt-3 text-sm leading-6 text-black/50 sm:text-base dark:text-white/50'>
              {description}
            </p>
          )}
          </div>
          <motion.div
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className='hidden h-px origin-left bg-linear-to-r from-black/25 to-transparent lg:block dark:from-white/25'
          />
        </div>
      )}

      {children}
      </div>
    </motion.section>
  )
}
