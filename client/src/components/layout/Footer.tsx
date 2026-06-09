import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';

import { routes } from '@/lib/routes';

export const Footer = () => {
  return (
    <footer className='border-t border-white/8 bg-[#24191e] pt-16 text-white/60'>
      <div className='mx-auto max-w-7xl px-6 lg:px-24'>
        <div className='grid grid-cols-2 gap-10 md:grid-cols-4'>
          {/* Brand */}
          <div className='col-span-2 md:col-span-1'>
            <Link
              href={routes.home}
              className='mb-4 flex items-center gap-2 text-base font-bold text-white'
            >
              <Sparkles className='h-5 w-5' strokeWidth={1.5} />
              <span>Veloura Beauty</span>
            </Link>
            <p className='max-w-xs text-sm text-white/50'>
              Modern makeup for expressive, everyday beauty.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className='mb-4 text-xs font-semibold tracking-widest text-white uppercase'>
              Beauty
            </h4>
            <ul className='space-y-2.5 text-sm text-white/50'>
              <li>
                <a
                  href={routes.products.root}
                  className='transition hover:text-white'
                >
                  All Products
                </a>
              </li>
              <li>
                <a href={routes.products.root} className='transition hover:text-white'>
                  New Shades
                </a>
              </li>
              <li>
                <a href={routes.products.root} className='transition hover:text-white'>
                  Veloura Favorites
                </a>
              </li>
              <li>
                <a href={routes.products.root} className='transition hover:text-white'>
                  Beauty Sets
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className='mb-4 text-xs font-semibold tracking-widest text-white uppercase'>
              Support
            </h4>
            <ul className='space-y-2.5 text-sm text-white/50'>
              <li>
                <a href={routes.contact} className='transition hover:text-white'>
                  Beauty Help
                </a>
              </li>
              <li>
                <a href={routes.contact} className='transition hover:text-white'>
                  Delivery
                </a>
              </li>
              <li>
                <a href={routes.contact} className='transition hover:text-white'>
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a
                  href={routes.contact}
                  className='transition hover:text-white'
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className='mb-4 text-xs font-semibold tracking-widest text-white uppercase'>
              Account
            </h4>
            <ul className='space-y-2.5 text-sm text-white/50'>
              <li>
                <a
                  href={routes.auth.me}
                  className='transition hover:text-white'
                >
                  My Account
                </a>
              </li>
              <li>
                <a href={routes.orders} className='transition hover:text-white'>
                  Orders
                </a>
              </li>
              <li>
                <a
                  href={routes.wishlist}
                  className='transition hover:text-white'
                >
                  Wishlist
                </a>
              </li>
              <li>
                <a href='#newsletter' className='transition hover:text-white'>
                  Newsletter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className='mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 pb-8 text-xs text-white/40 md:flex-row'>
          <p>© {new Date().getFullYear()} Veloura Beauty. All rights reserved.</p>

          <div className='flex items-center gap-5'>
            <a
              href='https://instagram.com'
              aria-label='Veloura Beauty on Instagram'
              className='transition hover:text-white'
            >
              <SiInstagram className='h-4 w-4' />
            </a>
            <a
              href='https://x.com'
              aria-label='Veloura Beauty on X'
              className='transition hover:text-white'
            >
              <SiX className='h-4 w-4' />
            </a>
            <a
              href='https://facebook.com'
              aria-label='Veloura Beauty on Facebook'
              className='transition hover:text-white'
            >
              <SiFacebook className='h-4 w-4' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
