#!/bin/bash

echo "🚀 Gaze Agent Deployment Script"
echo "================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    echo "Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Please create one with:"
    echo "OPENAI_API_KEY=your_openai_api_key_here"
    echo "DATABASE_URL=your_supabase_connection_string_here"
    echo "PORT=3000"
    exit 1
fi

echo "✅ .env file found"

# Test database connection
echo "🔍 Testing database connection..."
node -e "
import sql from './db.js'
sql\`SELECT NOW()\`.then(result => {
  console.log('✅ Database connected:', result[0].now)
  process.exit(0)
}).catch(error => {
  console.error('❌ Database connection failed:', error.message)
  process.exit(1)
})
"

if [ $? -eq 0 ]; then
    echo "✅ Database connection successful"
else
    echo "❌ Database connection failed. Check your DATABASE_URL in .env"
    exit 1
fi

echo ""
echo "🎉 Setup complete! You can now start the server with:"
echo "   npm start"
echo ""
echo "📋 Available commands:"
echo "   npm start    - Start the server"
echo "   npm run dev  - Start in development mode"
echo ""
echo "🌐 Server will run on: http://localhost:3000"
echo "📖 API documentation: See README.md" 