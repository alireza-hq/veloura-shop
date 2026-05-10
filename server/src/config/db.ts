import { Pool, types } from 'pg'
import { env } from './env'

types.setTypeParser(1700, (val) => parseFloat(val))

export const db = new Pool({
  connectionString: env.DATABASE_URL,
})
