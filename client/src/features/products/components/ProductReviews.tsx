'use client'

import { Star } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { useAuthStore } from '@/features/auth/store/useAuthStore'
import { routes } from '@/lib/routes'
import { cn } from '@/lib/utils/cn'

import { useReviews, useSaveReview } from '../hooks/useReviews'

export const ProductReviews = ({ productId }: { productId: number }) => {
  const { user, isAuthenticated } = useAuthStore()
  const { data: reviews = [], isLoading } = useReviews(productId)
  const { mutate, isPending, isSuccess } = useSaveReview(productId)
  const existing = reviews.find((review) => review.user.id === user?.id)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!rating || comment.trim().length < 3) return
    mutate({ rating, comment: comment.trim() })
  }

  return (
    <section className='mx-auto mt-20 max-w-7xl border-t border-black/8 px-4 pt-12 sm:px-6 lg:px-8 dark:border-white/10'>
      <div className='grid gap-12 lg:grid-cols-[0.75fr_1.25fr]'>
        <div>
          <p className='text-xs font-semibold tracking-[0.2em] text-rose-900/55 uppercase dark:text-rose-100/50'>
            Community notes
          </p>
          <h2 className='mt-4 text-4xl font-semibold tracking-[-0.04em] text-black dark:text-white'>
            Reviews that help.
          </h2>
          <p className='mt-4 text-sm leading-7 text-black/48 dark:text-white/48'>
            Share how the product worked for you. Your latest review replaces
            your previous one.
          </p>

          {isAuthenticated ? (
            <form onSubmit={submit} className='mt-8'>
              <div className='flex gap-1' aria-label='Choose rating'>
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type='button'
                    aria-label={`${value} stars`}
                    onClick={() => setRating(value)}
                    className='p-1'
                  >
                    <Star
                      className={cn(
                        'h-6 w-6 text-amber-400 transition',
                        value <= rating && 'fill-current',
                      )}
                    />
                  </button>
                ))}
              </div>
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                rows={5}
                maxLength={800}
                placeholder='What stood out?'
                className='mt-4 w-full resize-none rounded-2xl border border-black/10 bg-white/55 p-4 text-sm text-black outline-none transition focus:border-black/25 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white/25'
              />
              <button
                type='submit'
                disabled={isPending || !rating || comment.trim().length < 3}
                className='mt-4 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:opacity-75 disabled:opacity-35 dark:bg-white dark:text-[#24191e]'
              >
                {isPending
                  ? 'Saving...'
                  : existing
                    ? 'Update review'
                    : 'Publish review'}
              </button>
              {isSuccess && (
                <p className='mt-3 text-xs text-emerald-600 dark:text-emerald-400'>
                  Your review is live.
                </p>
              )}
            </form>
          ) : (
            <Link
              href={routes.auth.login}
              className='mt-7 inline-flex rounded-full border border-black/10 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-black hover:text-white dark:border-white/15 dark:text-white dark:hover:bg-white dark:hover:text-[#24191e]'
            >
              Sign in to review
            </Link>
          )}
        </div>

        <div className='divide-y divide-black/8 border-y border-black/8 dark:divide-white/10 dark:border-white/10'>
          {isLoading ? (
            <p className='py-10 text-sm text-black/40 dark:text-white/40'>
              Loading reviews...
            </p>
          ) : reviews.length ? (
            reviews.map((review) => (
              <article key={review.id} className='py-7'>
                <div className='flex items-center justify-between gap-4'>
                  <div>
                    <p className='font-semibold text-black dark:text-white'>
                      {review.user.username}
                    </p>
                    <p className='mt-1 text-xs text-black/35 dark:text-white/35'>
                      {new Date(review.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className='flex gap-0.5 text-amber-400'>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Star
                        key={value}
                        className={cn(
                          'h-4 w-4',
                          value <= review.rating && 'fill-current',
                        )}
                      />
                    ))}
                  </div>
                </div>
                <p className='mt-4 text-sm leading-7 text-black/55 dark:text-white/55'>
                  {review.comment}
                </p>
              </article>
            ))
          ) : (
            <p className='py-12 text-sm text-black/42 dark:text-white/42'>
              No reviews yet. Be the first to share your experience.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
