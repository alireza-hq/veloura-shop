import { privatePageMetadata } from '@/lib/seo'

export const metadata = { ...privatePageMetadata, title: 'Your Orders' }

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return children
}
