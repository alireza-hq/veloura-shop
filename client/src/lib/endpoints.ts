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
    clearCart: '/cart/items',
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
    reviews: (id: number) => `/products/${id}/reviews`,
  },

  checkout: {
    getCheckout: '/checkout',
  },

  orders: {
    createOrder: '/orders',
    getOrders: '/orders',
    getOrder: (id: number) => `orders/${id}`,

    getAdminOrders: '/admin/orders',
    getAdminOrder: (id: number) => `/admin/orders/${id}`,
    updateOrderStatus: (id: number) => `/admin/orders/${id}/status`,
  },

  wishlist: {
    getWishlist: '/wishlist',
    addToWishlist: '/wishlist',
    removeFromWishlist: (productId: number) => `/wishlist/${productId}`,
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

    orders: {
      root: '/admin/orders',
      getOrders: '/admin/orders',
      updateStatus: (id: number) => `/admin/orders/${id}/status`,
    },

    users: {
      root: '/admin/users',
      updateRole: (id: number) => `/admin/users/${id}/role`,
    },
  },
} as const
