import * as dotenv from 'dotenv'

import PgPromiseAdapter from '@/infrastructure/database/PgPromiseAdapter'

dotenv.config({ path: '.env.testing' })

async function connectDbTesting (): Promise<void> {
  const connection = new PgPromiseAdapter()
  connection.connect()
}

async function disconnectDbTesting (): Promise<void> {
  const connection = new PgPromiseAdapter()
  const tables = await connection.query(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = ($1);
    `, [process.env.DB_SCHEMA])

  for (const table of tables) {
    await connection.query(`TRUNCATE TABLE ${process.env.DB_SCHEMA}.${table.table_name} CASCADE;`, [])
  }
  await connection.disconnect()
}

export {
  connectDbTesting,
  disconnectDbTesting
}
