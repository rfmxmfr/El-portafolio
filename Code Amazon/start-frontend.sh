#!/bin/bash

echo "Starting El-portafolio frontend..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start the frontend development server
echo "Starting Vite development server..."
npm run dev

echo "Frontend server started!"