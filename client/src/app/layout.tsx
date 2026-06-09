import type { Metadata } from 'next'
import '@/styles/globals.css'

import { BiSupport } from 'react-icons/bi'

import { QueryProvider } from '@/app/providers/QueryProvider'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/navbar/Navbar'
import { AuthProvider } from '@/features/auth/providers/AuthProvider'
import { ThemeProvider } from '@/features/theme/providers/ThemeProvider'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
  title: {
    default: 'Veloura Beauty | Modern Makeup & Beauty Essentials',
    template: '%s | Veloura Beauty',
  },
  description:
    'Discover modern makeup, expressive color, and everyday beauty essentials curated by Veloura Beauty.',
  applicationName: 'Veloura Beauty',
  keywords: [
    'Veloura Beauty',
    'makeup',
    'beauty essentials',
    'cosmetics',
    'modern makeup',
    'beauty collections',
  ],
  authors: [{ name: 'Veloura Beauty' }],
  creator: 'Veloura Beauty',
  publisher: 'Veloura Beauty',
  category: 'Beauty',
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/icons/favicon.ico', sizes: 'any' },
      { url: '/icons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    siteName: 'Veloura Beauty',
    title: 'Veloura Beauty | Modern Makeup & Beauty Essentials',
    description:
      'Discover modern makeup, expressive color, and everyday beauty essentials curated by Veloura Beauty.',
    url: '/',
    images: [
      {
        url: '/logo/logo.png',
        width: 800,
        height: 871,
        alt: 'Veloura Beauty logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Veloura Beauty | Modern Makeup & Beauty Essentials',
    description:
      'Discover modern makeup, expressive color, and everyday beauty essentials curated by Veloura Beauty.',
    images: ['/logo/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={`h-full antialiased`} suppressHydrationWarning>
      <body className='flex min-h-full flex-col'>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Veloura Beauty',
              url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
              logo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/logo/logo.png`,
              email: 'care@velourabeauty.com',
            }).replace(/</g, '\\u003c'),
          }}
        />
        <ThemeProvider>
          <QueryProvider>
            <AuthProvider>
              <Navbar />

              {children}

              <Footer />

              <a
                href='mailto:care@velourabeauty.com'
                aria-label='Contact Veloura Beauty support'
                className='fixed right-0 bottom-0 z-50 m-5 rounded-full bg-white p-2 text-black opacity-95 shadow-md transition duration-200 hover:opacity-85 hover:shadow-lg active:opacity-75 dark:bg-[#39262f] dark:text-white'
              >
                <BiSupport className='h-6 w-6' />
              </a>
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
