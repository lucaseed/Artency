import postgres from 'postgres'
import dotenv from 'dotenv'

dotenv.config()

// Use correct hostname with connection pooling
const connectionString = process.env.DATABASE_URL.replace('db.rnrtsmvdxohkuprhzvtk.supabase.co', 'rnrtsmvdxohkuprhzvtk.supabase.co').replace(':5432', ':6543')
const sql = postgres(connectionString, {
  ssl: 'require'
})

export default sql