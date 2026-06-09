export const routes = {
  home: '/',
  cart: '/cart',
  checkout: '/checkout',
  categories: {
    root: '/categories',
    category: (id: number) => `/categories/${id}`,
  },
  wishlist: '/wishlist',
  about: '/about',
  contact: '/contact',
  search: (query: string) => `/search?q=${encodeURIComponent(query)}`,
  orders: '/orders',

  products: {
    root: '/products',
    product: (id: number) => `/products/${id}`,
  },

  auth: {
    login: '/login',
    signup: '/signup',
    me: '/profile',
  },

  admin: {
    root: '/admin',
    products: {
      root: '/admin/products',
      create: '/admin/products/create',
      edit: (id: number) => `/admin/products/${id}/edit`,
    },
    categories: {
      root: '/admin/categories',
      create: '/admin/categories/create',
      edit: (id: number) => `/admin/categories/${id}/edit`,
    },
  },
} as const
