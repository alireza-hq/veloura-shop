import cookieParser from 'cookie-parser'
import express from 'express'

import authRouter from './features/auth/auth.routes'
import cartRouter from './features/cart/cart.routes'
import categoryRouter from './features/categories/categories.routes'
import checkoutRouter from './features/checkout/checkout.routes'
import healthRouter from './features/health/health.routes'
import ordersRouter from './features/orders/orders.routes'
import productRouter from './features/products/products.routes'
import userRouter from './features/users/users.routes'
import wishlistRouter from './features/wishlist/wishlist.routes'

import { errorHandler } from './middlewares/error.middleware'
import { notFound } from './middlewares/notFound.middleware'

const app = express()

app.use(express.json())

// Cookies
app.use(cookieParser())

// Health
app.use('/health', healthRouter)

// Routes
app.use('/products', productRouter)
app.use('/categories', categoryRouter)
app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/cart', cartRouter)
app.use('/checkout', checkoutRouter)
app.use('/orders', ordersRouter)
app.use('/wishlist', wishlistRouter)

// Error Handlers
app.use(notFound)
app.use(errorHandler)

export default app
