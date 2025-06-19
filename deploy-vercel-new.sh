#!/bin/bash

echo "Deploying El-portafolio to Vercel as a new app..."

# Use npx to run Vercel CLI without installing globally
echo "Logging in to Vercel..."
npx vercel login

# Deploy to Vercel
echo "Deploying to Vercel..."
npx vercel --prod

echo "Deployment complete!"
echo "Use these credentials to log in:"
echo "Username: rmonteiro"
echo "Password: Junkie88"