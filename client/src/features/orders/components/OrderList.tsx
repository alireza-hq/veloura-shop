'use client'

import { Order } from '../types'
import { OrderItem } from './OrderItem'

type Props = {
  orders: Order[]
}

export const OrderList = ({ orders }: Props) => {
  return (
    <div className='space-y-4'>
      {orders.map((order) => (
        <OrderItem key={order.id} {...order} />
      ))}
    </div>
  )
}
