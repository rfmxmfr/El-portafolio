#!/bin/bash

echo "Deploying demo version with login fix to Vercel..."

# Commit changes
git add .
git commit -m "Fix login for demo and implement AI features"

# Build the application
echo "Building the application..."
npm run build

# Deploy to Vercel
echo "Deploying to Vercel..."
npx vercel --prod --yes

echo "Deployment complete! The demo version with AI features is now live."
echo "Use these credentials to log in:"
echo "Email: admin@example.com"
echo "Password: password123"