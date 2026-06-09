import type { NextConfig } from 'next'

const apiUrl = process.env.API_URL ?? 'http://localhost:3001'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },

  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: `${apiUrl}/:path*`,
    },
  ],
}

export default nextConfig
