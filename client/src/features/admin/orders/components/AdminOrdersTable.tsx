import { AdminOrder } from '../types'
import { AdminOrderRow } from './AdminOrderRow'

type Props = {
  orders: AdminOrder[]
}

export const AdminOrdersTable = ({ orders }: Props) => {
  if (orders.length === 0) {
    return (
      <div className='rounded-2xl border border-black/10 bg-white p-10 text-center text-sm text-black/50 dark:border-white/10 dark:bg-zinc-950 dark:text-white/50'>
        No orders found.
      </div>
    )
  }

  return (
    <div className='overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-zinc-950'>
      <table className='w-full text-sm'>
        <thead className='border-b border-black/10 text-left text-black/50 dark:border-white/10 dark:text-white/50'>
          <tr>
            <th className='p-4'>Order</th>
            <th className='p-4'>Customer</th>
            <th className='p-4'>Total</th>
            <th className='p-4'>Status</th>
            <th className='p-4'>Date</th>
            <th className='p-4 text-right'>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <AdminOrderRow key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
