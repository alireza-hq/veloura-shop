import { usePathname } from 'next/navigation';

export const useActive = (routeOrRoutes: string | string[]) => {
  const pathname = usePathname()
  const matches = (route: string) =>
    pathname === route || (route !== '/' && pathname.startsWith(`${route}/`))

  if (typeof routeOrRoutes === 'string') {
    return matches(routeOrRoutes)
  }

  return routeOrRoutes.some(matches)
}
