'use client'

import { Check, Clock, Mail, MessageCircle, Send, X } from 'lucide-react'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { CustomSelect } from '@/components/ui/CustomSelect'
import { cn } from '@/lib/utils/cn'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  contactSchema,
  type ContactFormValues,
} from '../schemas/contactSchema'

const subjects = [
  { value: 'order', label: 'Order inquiry' },
  { value: 'shade', label: 'Shade guidance' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'other', label: 'Something else' },
] as const

const contactItems = [
  {
    icon: Mail,
    label: 'Email us',
    value: 'care@velourabeauty.com',
    href: 'mailto:care@velourabeauty.com',
  },
  {
    icon: MessageCircle,
    label: 'Customer care',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: Clock,
    label: 'Response time',
    value: 'Usually within one business day',
  },
]

export const Contact = () => {
  const [showSuccess, setShowSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: 'order', message: '' },
  })
  const subject = useWatch({ control, name: 'subject' })

  const onSubmit = async (values: ContactFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    void values
    reset()
    setShowSuccess(true)
  }

  return (
    <>
      <div className='grid gap-14 py-8 pb-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 lg:py-16'>
        <section>
          <p className='text-xs font-semibold tracking-[0.24em] text-rose-900/55 uppercase dark:text-rose-100/50'>
            Veloura care
          </p>
          <h1 className='mt-6 text-5xl leading-[0.98] font-semibold tracking-[-0.055em] text-black sm:text-7xl dark:text-white'>
            Tell us what you need.
          </h1>
          <p className='mt-7 max-w-lg text-base leading-8 text-black/52 dark:text-white/52'>
            From shade questions to order updates, our care team is here to
            make the next step clear.
          </p>

          <div className='mt-12 divide-y divide-black/8 border-y border-black/8 dark:divide-white/10 dark:border-white/10'>
            {contactItems.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <>
                  <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black'>
                    <Icon className='h-4 w-4' />
                  </span>
                  <span>
                    <span className='block text-xs font-semibold tracking-wide text-black/38 uppercase dark:text-white/38'>
                      {label}
                    </span>
                    <span className='mt-1 block text-sm font-medium text-black dark:text-white'>
                      {value}
                    </span>
                  </span>
                </>
              )

              return href ? (
                <a
                  key={label}
                  href={href}
                  className='flex items-center gap-4 py-5 transition hover:opacity-65'
                >
                  {content}
                </a>
              ) : (
                <div key={label} className='flex items-center gap-4 py-5'>
                  {content}
                </div>
              )
            })}
          </div>
        </section>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className='rounded-[2rem] border border-black/8 bg-white/55 p-6 shadow-sm backdrop-blur-sm sm:p-9 dark:border-white/10 dark:bg-white/4'
        >
          <div className='mb-8'>
            <h2 className='text-2xl font-semibold tracking-tight text-black dark:text-white'>
              Send a message
            </h2>
            <p className='mt-2 text-sm text-black/45 dark:text-white/45'>
              A few details help us send you the right answer faster.
            </p>
          </div>

          <div className='grid gap-5 sm:grid-cols-2'>
            <Field
              label='Name'
              error={errors.name?.message}
              inputProps={register('name')}
              placeholder='Your name'
            />
            <Field
              label='Email'
              type='email'
              error={errors.email?.message}
              inputProps={register('email')}
              placeholder='you@example.com'
            />
          </div>

          <div className='mt-5'>
            <label className={labelClass}>Subject</label>
            <CustomSelect
              value={subject}
              onChange={(value) =>
                setValue('subject', value, { shouldValidate: true })
              }
              className='w-full'
              options={[...subjects]}
            />
            <ErrorText message={errors.subject?.message} />
          </div>

          <div className='mt-5'>
            <label htmlFor='message' className={labelClass}>
              Message
            </label>
            <textarea
              {...register('message')}
              id='message'
              rows={6}
              placeholder='How can we help?'
              className={cn(inputClass, 'resize-none')}
            />
            <ErrorText message={errors.message?.message} />
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className='mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-75 disabled:cursor-wait disabled:opacity-45 sm:w-auto dark:bg-white dark:text-black'
          >
            {isSubmitting ? 'Sending...' : 'Send message'}
            <Send className='h-4 w-4' />
          </button>
        </form>
      </div>

      {showSuccess && (
        <div className='fixed inset-x-4 bottom-5 z-80 mx-auto flex max-w-md items-start gap-4 rounded-2xl border border-black/8 bg-white/95 p-4 text-black shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/95 dark:text-white'>
          <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'>
            <Check className='h-4 w-4' />
          </span>
          <div className='min-w-0 flex-1'>
            <p className='text-sm font-semibold'>Message sent</p>
            <p className='mt-1 text-xs leading-5 text-black/50 dark:text-white/50'>
              Thanks for reaching out. Veloura care will reply soon.
            </p>
          </div>
          <button
            type='button'
            aria-label='Dismiss success message'
            onClick={() => setShowSuccess(false)}
            className='rounded-full p-1 text-black/35 transition hover:text-black dark:text-white/35 dark:hover:text-white'
          >
            <X className='h-4 w-4' />
          </button>
        </div>
      )}
    </>
  )
}

const Field = ({
  label,
  type = 'text',
  placeholder,
  error,
  inputProps,
}: {
  label: string
  type?: string
  placeholder: string
  error?: string
  inputProps: React.InputHTMLAttributes<HTMLInputElement>
}) => (
  <div>
    <label className={labelClass}>{label}</label>
    <input
      {...inputProps}
      type={type}
      placeholder={placeholder}
      className={cn(inputClass, error && 'border-red-400 dark:border-red-500')}
    />
    <ErrorText message={error} />
  </div>
)

const ErrorText = ({ message }: { message?: string }) =>
  message ? <p className='mt-1.5 text-xs text-red-600 dark:text-red-400'>{message}</p> : null

const labelClass =
  'mb-2 block text-xs font-semibold tracking-wide text-black/50 uppercase dark:text-white/50'

const inputClass =
  'w-full rounded-xl border border-black/10 bg-white/65 px-4 py-3 text-sm text-black placeholder:text-black/28 transition focus:border-black/30 focus:outline-none dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/28 dark:focus:border-white/30'
