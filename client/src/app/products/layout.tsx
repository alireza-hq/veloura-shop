import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Makeup & Beauty Products',
  description:
    'Shop Veloura Beauty makeup, expressive color, and high-performance everyday essentials.',
  path: '/products',
})

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children
}
