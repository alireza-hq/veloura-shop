import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: 'http://localhost:3001/:path*',
    },
    {
      source: '/api2/:path*',
      destination: 'http://localhost:3002/:path*',
    },
  ],
}

export default nextConfig
