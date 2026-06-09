import type { Metadata } from 'next'

type Props = {
  children: React.ReactNode
  params: Promise<{ id: string }>
}

type ProductMetadata = {
  name: string
  description?: string
  image?: string
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id } = await params
  const apiUrl = process.env.API_URL ?? 'http://localhost:3001'

  try {
    const response = await fetch(`${apiUrl}/products/${id}`, {
      next: { revalidate: 300 },
    })

    if (!response.ok) throw new Error('Product not found')

    const product = (await response.json()) as ProductMetadata
    const description =
      product.description ??
      `Discover ${product.name}, a modern beauty essential from Veloura Beauty.`

    return {
      title: product.name,
      description,
      alternates: { canonical: `/products/${id}` },
      openGraph: {
        title: product.name,
        description,
        url: `/products/${id}`,
        images: product.image ? [{ url: product.image, alt: product.name }] : undefined,
      },
      twitter: {
        title: product.name,
        description,
        images: product.image ? [product.image] : undefined,
      },
    }
  } catch {
    return {
      title: 'Product',
      description: 'Discover this beauty essential from Veloura Beauty.',
      alternates: { canonical: `/products/${id}` },
    }
  }
}

export default function ProductLayout({ children }: Props) {
  return children
}
