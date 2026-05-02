import { FitLayout } from './layout/FitLayout'

export const LoadingState = () => {
  return (
    <FitLayout>
      <div className='flex items-center justify-center py-12 sm:py-20'>
        <div className='h-6 w-6 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-white'></div>
      </div>
    </FitLayout>
  )
}
