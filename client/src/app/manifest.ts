import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Veloura Beauty',
    short_name: 'Veloura',
    description:
      'Modern makeup and everyday beauty essentials curated by Veloura Beauty.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fbf7f5',
    theme_color: '#24191e',
    icons: [
      {
        src: '/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
