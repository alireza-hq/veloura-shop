import { AdminLayout } from '@/features/admin/components/AdminLayout'
import { privatePageMetadata } from '@/lib/seo'

export const metadata = { ...privatePageMetadata, title: 'Admin' }

type Props = { children: React.ReactNode }

export default function Layout({ children }: Props) {
  return <AdminLayout>{children}</AdminLayout>
}
