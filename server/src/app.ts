import cors from 'cors'
import express from 'express'
import path from 'path'

import { errorHandler } from './middlewares/error.middleware'
import { notFound } from './middlewares/notFound.middleware'
import authRouter from './routes/auth.routes'
import cartRouter from './routes/cart.routes'
import categoryRouter from './routes/categories.routes'
import healthRouter from './routes/health.routes'
import ordersRouter from './routes/orders.routes'
import productRouter from './routes/products.routes'
import userRouter from './routes/users.routes'

const app = express()

app.use(
  cors()
)

app.use(express.json())

app.use(express.static(path.join(process.cwd(), 'public')))

// Health Check
app.use('/health', healthRouter)

// Routes
app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/products', productRouter)
app.use('/categories', categoryRouter)
app.use('/cart', cartRouter)
app.use('/orders', ordersRouter)

// Error Handlers
app.use(notFound)
app.use(errorHandler)

export default app

// TODO: Later we can make validate() generic so you don’t need as string.
