import { ArrowUpRight, Mail, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { SiFacebook, SiInstagram, SiX } from 'react-icons/si'

import { routes } from '@/lib/routes'

const footerGroups = [
  {
    title: 'Shop',
    links: [
      { label: 'All products', href: routes.products.root },
      { label: 'Collections', href: routes.collections.root },
      { label: 'Wishlist', href: routes.wishlist },
      { label: 'Shopping bag', href: routes.cart },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Veloura', href: routes.about },
      { label: 'Contact us', href: routes.contact },
      { label: 'Beauty notes', href: '/#newsletter' },
    ],
  },
  {
    title: 'Your account',
    links: [
      { label: 'Profile', href: routes.auth.me },
      { label: 'Orders & tracking', href: routes.orders },
      { label: 'Checkout', href: routes.checkout },
    ],
  },
] as const

const socials = [
  { label: 'Instagram', href: 'https://instagram.com', icon: SiInstagram },
  { label: 'X', href: 'https://x.com', icon: SiX },
  { label: 'Facebook', href: 'https://facebook.com', icon: SiFacebook },
] as const

export const Footer = () => {
  return (
    <footer className='border-t border-white/8 bg-[#24191e] text-white'>
      <div className='mx-auto max-w-7xl px-6 pt-14 pb-7 lg:px-12 lg:pt-18'>
        <div className='grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.25fr_2fr] lg:gap-20'>
          <div>
            <Link
              href={routes.home}
              className='flex w-fit items-center gap-2 text-lg font-semibold'
            >
              <Sparkles className='h-5 w-5' strokeWidth={1.5} />
              Veloura Beauty
            </Link>
            <p className='mt-4 max-w-sm text-sm leading-6 text-white/45'>
              Modern makeup essentials made for expressive, everyday beauty.
            </p>

            <a
              href='mailto:care@velourabeauty.com'
              className='mt-7 flex w-fit items-center gap-2 rounded-full border border-white/12 px-4 py-2.5 text-sm text-white/70 transition hover:border-white/25 hover:text-white'
            >
              <Mail className='h-4 w-4' />
              care@velourabeauty.com
            </a>
          </div>

          <div className='grid grid-cols-2 gap-8 sm:grid-cols-3'>
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className='text-xs font-semibold tracking-[0.18em] text-white/35 uppercase'>
                  {group.title}
                </h2>
                <ul className='mt-5 space-y-3'>
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className='text-sm text-white/55 transition hover:text-white'
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-5 pt-7 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between'>
          <p>&copy; {new Date().getFullYear()} Veloura Beauty. All rights reserved.</p>

          <div className='flex items-center gap-2'>
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target='_blank'
                rel='noreferrer'
                aria-label={`Veloura Beauty on ${label}`}
                className='flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/45 transition hover:border-white/25 hover:text-white'
              >
                <Icon className='h-3.5 w-3.5' />
              </a>
            ))}
            <Link
              href={routes.contact}
              className='ml-2 flex items-center gap-1.5 text-white/45 transition hover:text-white'
            >
              Help
              <ArrowUpRight className='h-3.5 w-3.5' />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
