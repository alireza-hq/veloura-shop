import { privatePageMetadata } from '@/lib/seo'

export const metadata = { ...privatePageMetadata, title: 'Your Wishlist' }

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return children
}
