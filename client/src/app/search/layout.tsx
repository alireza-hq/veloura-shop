import { privatePageMetadata } from '@/lib/seo'

export const metadata = { ...privatePageMetadata, title: 'Search' }

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children
}
