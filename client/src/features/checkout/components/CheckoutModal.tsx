import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

type Props = { checkoutMessage: string }

export const CheckoutModal = ({ checkoutMessage }: Props) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className='rounded-2xl bg-white p-8 text-center shadow-2xl dark:bg-zinc-900'
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CheckCircle className='mx-auto mb-4 h-16 w-16 text-green-500' />
        </motion.div>
        <h2 className='text-2xl font-bold text-black dark:text-white'>
          {checkoutMessage}
        </h2>
        <p className='mt-2 text-sm text-black/60 dark:text-white/60'>
          Redirecting you to the shop...
        </p>
      </motion.div>
    </div>
  )
}
