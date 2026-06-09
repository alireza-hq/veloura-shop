const fs = require('fs')
const path = require('path')
const { Pool } = require('pg')
require('dotenv').config()

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required')
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8')

pool
  .query(schema)
  .then(() => console.log('Database schema is ready'))
  .finally(() => pool.end())
