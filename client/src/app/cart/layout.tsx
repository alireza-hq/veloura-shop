import { privatePageMetadata } from '@/lib/seo'

export const metadata = { ...privatePageMetadata, title: 'Shopping Bag' }

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children
}
