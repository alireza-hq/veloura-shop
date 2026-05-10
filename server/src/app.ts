import express from 'express'

import { errorHandler } from './middlewares/error.middleware'
import { notFound } from './middlewares/notFound.middleware'

import productRouter from './features/products/products.routes'
import categoryRouter from './features/categories/categories.routes'
import authRouter from './features/auth/auth.routes'
import userRouter from './features/users/users.routes'
import cartRouter from './features/cart/cart.routes'

const app = express()

app.use(express.json())

// Health Check
// app.use('/health', healthRouter)

// Routes
app.use('/products', productRouter)
app.use('/categories', categoryRouter)
app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/cart', cartRouter)

// Error Handlers
app.use(notFound)
app.use(errorHandler)

export default app
