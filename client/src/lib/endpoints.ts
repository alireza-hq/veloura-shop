export const endpoints = {
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    logout: '/auth/logout',
    me: '/users/me',
  },

  cart: {
    getCart: '/cart',
    addCartItem: '/cart/items',
    updateCartItem: (productId: number) => `/cart/items/${productId}`,
    removeCartItem: (productId: number) => `/cart/items/${productId}`,
  },

  categories: {
    getCategories: '/categories',
    getCategory: (id: number) => `/categories/${id}`,
    createCategory: '/categories',
    updateCategory: (id: number) => `/categories/${id}`,
    deleteCategory: (id: number) => `/categories/${id}`,
  },

  products: {
    getProducts: '/products',
    getProduct: (id: number) => `/products/${id}`,
    createProduct: '/products',
    updateProduct: (id: number) => `/products/${id}`,
    deleteProduct: (id: number) => `/products/${id}`,
  },

  checkout: {
    getCheckout: '/checkout',
  },

  orders: {
    createOrder: '/orders',
    getOrders: '/orders',
    getOrder: (id: number) => `orders/${id}`,
  },

  wishlist: {
    getWishlist: '/wishlist',
    addToWishlist: '/wishlist',
    removeFromWishlist: (productId: number) => `/wishlist/${productId}`,
  },
} as const
