import { routes } from '@/lib/routes'
import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'
import { SiInstagram, SiFacebook, SiX } from 'react-icons/si'

export const Footer = () => {
  return (
    <footer className='border-t border-white/10 bg-black pt-16 text-white/60'>
      <div className='mx-auto max-w-7xl px-6 lg:px-24'>
        <div className='grid grid-cols-2 gap-10 md:grid-cols-4'>
          {/* Brand */}
          <div className='col-span-2 md:col-span-1'>
            <Link
              href={routes.home}
              className='mb-4 flex items-center gap-2 text-base font-bold text-white'
            >
              <FaShoppingCart className='h-5 w-5' strokeWidth={1.5} />
              <span>Cartify</span>
            </Link>
            <p className='max-w-xs text-sm text-white/50'>
              Your one-stop shop for all your needs.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className='mb-4 text-xs font-semibold tracking-widest text-white uppercase'>
              Shop
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
                <a href='#' className='transition hover:text-white'>
                  New Arrivals
                </a>
              </li>
              <li>
                <a href='#' className='transition hover:text-white'>
                  Best Sellers
                </a>
              </li>
              <li>
                <a href='#' className='transition hover:text-white'>
                  Sale
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
                <a href='#' className='transition hover:text-white'>
                  Help Center
                </a>
              </li>
              <li>
                <a href='#' className='transition hover:text-white'>
                  Shipping
                </a>
              </li>
              <li>
                <a href='#' className='transition hover:text-white'>
                  Returns
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
                <a href='#' className='transition hover:text-white'>
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
                <a href='#' className='transition hover:text-white'>
                  Newsletter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className='mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 pb-8 text-xs text-white/40 md:flex-row'>
          <p>© {new Date().getFullYear()} Cartify. All rights reserved.</p>

          <div className='flex items-center gap-5'>
            <a href='#' className='transition hover:text-white'>
              <SiInstagram className='h-4 w-4' />
            </a>
            <a href='#' className='transition hover:text-white'>
              <SiX className='h-4 w-4' />
            </a>
            <a href='#' className='transition hover:text-white'>
              <SiFacebook className='h-4 w-4' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
