#!/bin/bash

echo "Deploying fixed version to Vercel..."

# Login to Vercel first
echo "Logging in to Vercel..."
npx vercel login

# Commit changes
git add .
git commit -m "Fix build errors and implement client-side login"

# Build the application
echo "Building the application..."
npm run build

# Deploy to Vercel
echo "Deploying to Vercel..."
npx vercel --prod

echo "Deployment complete! The application with AI features is now live."
echo "Use these credentials to log in:"
echo "Email: admin@example.com"
echo "Password: password123"