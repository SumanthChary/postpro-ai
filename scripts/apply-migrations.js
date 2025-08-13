const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

const pool = new Pool({
  host: 'db.rskzizedzagohmvyhuyu.supabase.co',
  database: 'postgres',
  user: 'postgres',
  password: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJza3ppemVkemFnb2htdnlodXl1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzAzODc3OSwiZXhwIjoyMDUyNjE0Nzc5fQ.c8XlDIGEzrj6rTw09o8fYFpX80mhTdDQVN2-EmVGBsk',
  port: 5432,
  ssl: { rejectUnauthorized: false }
})

async function applyMigrations() {
  const migrations = [
    '20250812000000_add_indices.sql',
    '20250812000001_add_subscription_expiration_handler.sql',
    '20250812000002_improve_credits_handling.sql',
    '20250812000003_improve_payment_handling.sql'
  ]

  const client = await pool.connect()
  try {
    for (const migration of migrations) {
      console.log(`Applying migration: ${migration}`)
      const sql = fs.readFileSync(path.join('supabase/migrations', migration), 'utf8')
      await client.query(sql)
      console.log(`Successfully applied migration: ${migration}`)
    }
  } catch (error) {
    console.error('Error applying migrations:', error)
    process.exit(1)
  } finally {
    client.release()
  }
}

applyMigrations().catch(console.error)
