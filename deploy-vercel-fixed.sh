#!/bin/bash

echo "Deploying El-portafolio to Vercel..."

# Fix package-lock.json inconsistencies
echo "Updating dependencies..."
rm -f package-lock.json
npm install

# Create optimized build
echo "Building project..."
npm run build

# Deploy to Vercel using production settings
echo "Deploying to Vercel..."
npx vercel --prod

echo "Deployment complete!"