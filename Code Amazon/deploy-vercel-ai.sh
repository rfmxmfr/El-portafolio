#!/bin/bash

# Commit AI features
echo "Committing AI features..."
git add .
git commit -m "Add AI and ML features to portfolio admin dashboard"

# Build the frontend
echo "Building frontend..."
npm run build

# Deploy using npx with --yes flag
echo "Deploying to Vercel..."
npx vercel --prod --yes

echo "AI features deployed to Vercel successfully!"