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
        'relative mb-10 overflow-hidden rounded-3xl border border-black/8 bg-white/65 px-6 py-10 shadow-sm backdrop-blur-sm sm:px-10 sm:py-14 dark:border-white/10 dark:bg-white/4',
        align === 'center' && 'text-center',
        className,
      )}
    >
      <div className='pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-rose-200/30 blur-3xl dark:bg-rose-950/20' />
      <div className='relative'>
        {eyebrow && (
          <p className='mb-3 text-xs font-semibold tracking-[0.22em] text-black/45 uppercase dark:text-white/45'>
            {eyebrow}
          </p>
        )}
        <h1 className='text-3xl font-semibold tracking-tight text-black sm:text-5xl dark:text-white'>
          {title}
        </h1>
        {description && (
          <p
            className={cn(
              'mt-4 max-w-2xl text-sm leading-6 text-black/55 sm:text-base dark:text-white/55',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </p>
        )}
      </div>
    </header>
  )
}
