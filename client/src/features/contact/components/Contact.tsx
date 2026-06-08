'use client'

import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import { FormEvent, useState } from 'react'

import { CustomSelect } from '@/components/ui/CustomSelect'
import { cn } from '@/lib/utils/cn'

const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    value: 'care@velourabeauty.com',
    href: 'mailto:care@velourabeauty.com',
  },
  {
    icon: Phone,
    label: 'Call',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon-Fri, 9am-6pm',
    href: undefined,
  },
]

export const Contact = () => {
  const [sent, setSent] = useState(false)
  const [subject, setSubject] = useState('order')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.currentTarget.reset()
    setSubject('order')
    setSent(true)
  }

  return (
    <div className='space-y-10 sm:space-y-14'>
      <section className='relative overflow-hidden rounded-[2rem] bg-zinc-950 px-6 py-14 text-white sm:px-10 sm:py-20 lg:px-16'>
        <div className='pointer-events-none absolute -top-28 right-0 h-80 w-80 rounded-full bg-rose-300/15 blur-3xl' />
        <div className='relative max-w-3xl'>
          <p className='text-xs font-semibold tracking-[0.24em] text-white/45 uppercase'>
            Veloura care
          </p>
          <h1 className='mt-5 text-4xl font-semibold tracking-tight sm:text-6xl'>
            Let&apos;s find your answer.
          </h1>
          <p className='mt-5 max-w-xl text-base leading-7 text-white/55 sm:text-lg'>
            Need shade guidance, delivery help, or a second opinion? Tell us
            what is on your mind.
          </p>
        </div>
      </section>

      <div className='grid gap-6 lg:grid-cols-[0.75fr_1.25fr]'>
        <aside className='space-y-4'>
          {contactItems.map(({ icon: Icon, label, value, href }) => {
            const Wrapper = href ? 'a' : 'div'
            return (
              <Wrapper
                key={label}
                {...(href ? { href } : {})}
                className='flex items-center gap-4 rounded-3xl border border-black/8 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition hover:border-black/15 dark:border-white/10 dark:bg-white/4 dark:hover:border-white/20'
              >
                <span className='rounded-full bg-black p-3 text-white dark:bg-white dark:text-black'>
                  <Icon className='h-4 w-4' />
                </span>
                <div>
                  <p className='text-xs tracking-wide text-black/40 uppercase dark:text-white/40'>
                    {label}
                  </p>
                  <p className='mt-1 text-sm font-medium text-black dark:text-white'>
                    {value}
                  </p>
                </div>
              </Wrapper>
            )
          })}

          <div className='rounded-3xl bg-rose-100/70 p-6 dark:bg-rose-950/20'>
            <MapPin className='h-5 w-5 text-black/40 dark:text-white/40' />
            <p className='mt-4 text-sm font-semibold text-black dark:text-white'>
              Veloura studio
            </p>
            <p className='mt-2 text-sm leading-6 text-black/50 dark:text-white/50'>
              18 Rosewood Avenue
              <br />
              Beauty District
              <br />
              San Francisco, CA 94105
            </p>
          </div>
        </aside>

        <form
          onSubmit={handleSubmit}
          className='rounded-[2rem] border border-black/8 bg-white/75 p-6 shadow-sm backdrop-blur-sm sm:p-9 dark:border-white/10 dark:bg-white/4'
        >
          <div className='grid gap-5 sm:grid-cols-2'>
            <Field label='Name' id='name' placeholder='Your name' />
            <Field
              label='Email'
              id='email'
              type='email'
              placeholder='you@example.com'
            />
          </div>

          <div className='mt-5'>
            <label className={labelClass}>Subject</label>
            <CustomSelect
              value={subject}
              onChange={setSubject}
              className='w-full'
              options={[
                { value: 'order', label: 'Order inquiry' },
                { value: 'shade', label: 'Shade guidance' },
                { value: 'partnership', label: 'Partnership' },
                { value: 'other', label: 'Other' },
              ]}
            />
          </div>

          <div className='mt-5'>
            <label htmlFor='message' className={labelClass}>
              Message
            </label>
            <textarea
              id='message'
              rows={6}
              required
              placeholder='How can we help you?'
              className={cn(inputClass, 'resize-none')}
            />
          </div>

          <button
            type='submit'
            className='mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-black/80 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-white/80'
          >
            Send message
            <Send className='h-4 w-4' />
          </button>

          {sent && (
            <p className='mt-4 text-sm text-emerald-600 dark:text-emerald-400'>
              Message received. Veloura care will be in touch soon.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

const Field = ({
  label,
  id,
  type = 'text',
  placeholder,
}: {
  label: string
  id: string
  type?: string
  placeholder: string
}) => (
  <div>
    <label htmlFor={id} className={labelClass}>
      {label}
    </label>
    <input
      id={id}
      type={type}
      required
      placeholder={placeholder}
      className={inputClass}
    />
  </div>
)

const labelClass =
  'mb-2 block text-xs font-semibold tracking-wide text-black/55 uppercase dark:text-white/55'

const inputClass =
  'w-full rounded-xl border border-black/10 bg-white/60 px-4 py-3 text-sm text-black placeholder:text-black/30 transition focus:border-black/30 focus:outline-none dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-white/30 dark:focus:border-white/30'
