import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Contact',
  description:
    'Contact Veloura Beauty for product guidance, order support, delivery questions, and beauty advice.',
  path: '/contact',
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
