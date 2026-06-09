import { cn } from '@/lib/utils/cn'

type Props = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export const PageHeader = ({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: Props) => {
  return (
    <header
      className={cn(
        'mb-12 max-w-3xl py-4 sm:mb-16 sm:py-8',
        align === 'center' && 'text-center',
        className,
      )}
    >
      {eyebrow && (
        <p className='mb-4 text-xs font-semibold tracking-[0.22em] text-rose-900/55 uppercase dark:text-rose-100/50'>
          {eyebrow}
        </p>
      )}
      <h1 className='text-4xl font-semibold tracking-[-0.04em] text-black sm:text-6xl dark:text-white'>
        {title}
      </h1>
      {description && (
        <p
          className={cn(
            'mt-5 max-w-2xl text-base leading-7 text-black/52 dark:text-white/52',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </header>
  )
}
