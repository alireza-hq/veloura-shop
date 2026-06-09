import type { Metadata } from 'next'
import '@/styles/globals.css'

import { BiSupport } from 'react-icons/bi'

import { QueryProvider } from '@/app/providers/QueryProvider'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/navbar/Navbar'
import { AuthProvider } from '@/features/auth/providers/AuthProvider'
import { ThemeProvider } from '@/features/theme/providers/ThemeProvider'

export const metadata: Metadata = {
  title: 'Veloura Beauty',
  description: 'Modern makeup essentials for expressive, everyday beauty.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={`h-full antialiased`} suppressHydrationWarning>
      <body className='flex min-h-full flex-col'>
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
