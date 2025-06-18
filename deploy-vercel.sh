#!/bin/bash

# Build the frontend
echo "Building frontend..."
npm run build

# Deploy using npx instead of global installation
echo "Deploying to Vercel..."
npx vercel --prod

echo "Deployment complete!"