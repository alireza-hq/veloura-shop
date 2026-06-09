import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'About',
  description:
    'Meet Veloura Beauty and discover our considered approach to modern makeup and expressive everyday beauty.',
  path: '/about',
})

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
