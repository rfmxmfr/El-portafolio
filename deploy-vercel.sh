#!/bin/bash

# Build the frontend
echo "Building frontend..."
npm run build

# Deploy using npx with --yes flag
echo "Deploying to Vercel..."
npx vercel --prod --yes

echo "Deployment complete!"