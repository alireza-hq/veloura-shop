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
} as const
