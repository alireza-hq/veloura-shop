export const routes = {
  home: '/',
  cart: '/cart',
  checkout: '/checkout',
  categories: '/categories',
  wishlist: '/wishlist',
  about: '/about',
  contact: '/contact',
  orders: '/orders',

  products: {
    root: '/products',
    product: (id: number | string) => `/products/${id}`,
  },

  auth: {
    login: '/login',
    signup: '/signup',
    me: '/me',
  },
} as const
