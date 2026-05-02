export const routes = {
  home: '/',
  cart: '/cart',
  checkout: '/checkout',
  categories: '/categories',
  wishlist: '/wishlist',
  about: '/about',
  contact: '/contact',

  products: {
    root: '/products',
    product: (id: number) => `/product/${id}`,
  },

  auth: {
    login: '/login',
    signup: '/signup',
    me: '/me',
  },
} as const
