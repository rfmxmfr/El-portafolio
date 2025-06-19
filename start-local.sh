#!/bin/bash

# Navigate to the project directory (in case the script is run from elsewhere)
cd "$(dirname "$0")"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start the development server
echo "Starting development server..."
npm run dev -- --open