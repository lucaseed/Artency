import dotenv from 'dotenv'
dotenv.config()

console.log('Environment check:')
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set')
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'Set' : 'Not set')

if (process.env.DATABASE_URL) {
  console.log('Full DATABASE_URL:', process.env.DATABASE_URL)
} else {
  console.log('DATABASE_URL is undefined!')
} 