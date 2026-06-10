import { NextResponse, type NextRequest } from 'next/server'

export function proxy(req: NextRequest) {
  const token = req.cookies.get('token')

  if (!token) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set(
      'next',
      `${req.nextUrl.pathname}${req.nextUrl.search}`,
    )

    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/cart/:path*',
    '/checkout/:path*',
    '/orders/:path*',
    '/wishlist/:path*',
    '/admin/:path*',
  ],
}
