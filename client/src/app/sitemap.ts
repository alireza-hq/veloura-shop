import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const apiUrl = process.env.API_URL ?? 'http://localhost:3001'

type SitemapProduct = {
  id: number
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/products', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/collections', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.5, changeFrequency: 'monthly' as const },
  ]

  const staticRoutes = routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))

  try {
    const response = await fetch(`${apiUrl}/products`, {
      next: { revalidate: 3600 },
    })
    if (!response.ok) return staticRoutes

    const products = (await response.json()) as SitemapProduct[]
    const productRoutes: MetadataRoute.Sitemap = products.map(({ id }) => ({
      url: `${siteUrl}/products/${id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

    return [...staticRoutes, ...productRoutes]
  } catch {
    return staticRoutes
  }
}
