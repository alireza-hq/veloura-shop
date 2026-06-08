import { usePathname } from 'next/navigation';

export const useActive = (routeOrRoutes: string | string[]) => {
  const pathname = usePathname()

  if (typeof routeOrRoutes === 'string') {
    return routeOrRoutes === pathname
  }

  return routeOrRoutes.includes(pathname)
}
