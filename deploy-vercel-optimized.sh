#!/bin/bash

echo "Deploying El-portafolio to Vercel with optimized settings..."

# Install dependencies
npm install react-admin

# Create a production build
echo "Creating production build..."
npm run build

# Deploy to Vercel with specific build settings
echo "Deploying to Vercel..."
npx vercel deploy --prod --build-env NODE_ENV=production

echo "Deployment complete!"