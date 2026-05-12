export const endpoints = {
  products: {
    getProducts: '/products',
    getProduct: (id: number) => `/products/${id}`,
    createProduct: '/products',
    updateProducts: (id: number) => `/products/${id}`,
    deleteProducts: (id: number) => `/products/${id}`,
  },

  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    logout: '/auth/logout',
    me: '/users/me',
  },

  wishlist: {
    getWishlist: '/wishlist',
    addToWishlist: '/wishlist',
    removeFromWishlist: (productId: number) => `/wishlist/${productId}`,
  },
} as const
