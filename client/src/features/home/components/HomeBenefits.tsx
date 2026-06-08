import { HeartHandshake, PackageCheck, Sparkles } from 'lucide-react'

const benefits = [
  {
    icon: Sparkles,
    title: 'Curated beauty',
    text: 'Reliable formulas, edited with intention.',
  },
  {
    icon: PackageCheck,
    title: 'Easy delivery',
    text: 'Free shipping on orders over $50.',
  },
  {
    icon: HeartHandshake,
    title: 'Real support',
    text: 'Friendly guidance before and after checkout.',
  },
]

export const HomeBenefits = () => {
  return (
    <div className='grid overflow-hidden rounded-3xl border border-black/8 bg-white/75 shadow-sm backdrop-blur-md sm:grid-cols-3 dark:border-white/10 dark:bg-white/5'>
      {benefits.map(({ icon: Icon, title, text }) => (
        <div
          key={title}
          className='flex items-start gap-4 border-b border-black/6 px-5 py-6 last:border-0 sm:border-r sm:border-b-0 sm:last:border-r-0 dark:border-white/8'
        >
          <span className='rounded-full bg-black p-2.5 text-white dark:bg-white dark:text-black'>
            <Icon className='h-4 w-4' />
          </span>
          <div>
            <p className='text-sm font-semibold text-black dark:text-white'>
              {title}
            </p>
            <p className='mt-1 text-xs leading-5 text-black/50 dark:text-white/50'>
              {text}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
