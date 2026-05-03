'use client'

import { MapPin, Mail, Phone, Clock } from 'lucide-react'

export const Contact = () => {
  return (
    <div className='flex flex-col gap-20'>
      {/* Header */}
      <section className='text-center'>
        <h1 className='text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white'>
          Get in Touch
        </h1>
        <p className='mx-auto mt-4 max-w-xl text-lg text-zinc-600 dark:text-zinc-400'>
          Have a question about your order or our products? We're here to help.
        </p>
      </section>

      {/* Contact Grid */}
      <div className='grid grid-cols-1 gap-12 lg:grid-cols-3'>
        {/* Contact Info Cards */}
        <div className='flex flex-col gap-6 lg:col-span-1'>
          {[
            {
              icon: Mail,
              label: 'Email Us',
              value: 'support@shop.com',
              href: 'mailto:support@shop.com',
            },
            {
              icon: Phone,
              label: 'Call Us',
              value: '+1 (555) 123-4567',
              href: 'tel:+15551234567',
            },
            {
              icon: Clock,
              label: 'Hours',
              value: 'Mon-Fri: 9am - 6pm',
              href: '',
            },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              className='flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-zinc-800'
            >
              <div className='mt-1 rounded-lg bg-zinc-100 p-2 text-zinc-900 dark:bg-zinc-800 dark:text-white'>
                <item.icon className='h-5 w-5' />
              </div>
              <div>
                <h3 className='font-semibold text-zinc-900 dark:text-white'>
                  {item.label}
                </h3>
                <p className='text-sm text-zinc-600 dark:text-zinc-400'>
                  {item.value}
                </p>
              </div>
            </a>
          ))}

          {/* Address Card */}
          <div className='mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50'>
            <div className='flex items-start gap-3'>
              <MapPin className='mt-1 h-5 w-5 text-zinc-500 dark:text-zinc-400' />
              <div>
                <h3 className='font-semibold text-zinc-900 dark:text-white'>
                  Visit Our HQ
                </h3>
                <p className='mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400'>
                  123 Commerce Street,
                  <br />
                  Tech District,
                  <br />
                  San Francisco, CA 94105
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className='lg:col-span-2'>
          <form className='space-y-6 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-10 dark:border-zinc-800 dark:bg-zinc-900'>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              <div>
                <label
                  htmlFor='name'
                  className='mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300'
                >
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  placeholder='John Doe'
                  className='w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 transition focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-zinc-400'
                />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300'
                >
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  placeholder='john@example.com'
                  className='w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 transition focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-zinc-400'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='subject'
                className='mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300'
              >
                Subject
              </label>
              <select
                id='subject'
                className='w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 transition focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-zinc-400'
              >
                <option>Order Inquiry</option>
                <option>Product Support</option>
                <option>Partnership</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor='message'
                className='mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300'
              >
                Message
              </label>
              <textarea
                id='message'
                rows={5}
                placeholder='How can we help you?'
                className='w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 transition focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500 dark:focus:border-zinc-400'
              ></textarea>
            </div>

            <button
              type='submit'
              className='w-full rounded-xl bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.98] dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200'
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
