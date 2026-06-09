import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Beauty Collections',
  description:
    'Explore focused Veloura Beauty collections organized by finish, feature, and everyday ritual.',
  path: '/collections',
})

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return children
}
