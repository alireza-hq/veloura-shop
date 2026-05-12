import { usePathname } from 'next/navigation';

export const useActive = (routeOrRoutes: string | string[]) => {
  const pathname = usePathname()

  if (typeof routeOrRoutes === 'string') {
    return routeOrRoutes === usePathname()
  } else if (Array.isArray(routeOrRoutes)) {
    return routeOrRoutes.includes(pathname)
  }

  return false
}
