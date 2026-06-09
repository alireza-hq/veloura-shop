import type { Metadata } from 'next'

type SeoInput = {
  title: string
  description: string
  path: string
}

export const createPageMetadata = ({
  title,
  description,
  path,
}: SeoInput): Metadata => ({
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: path,
  },
  twitter: {
    title,
    description,
  },
})

export const privatePageMetadata: Metadata = {
  robots: { index: false, follow: false },
}
