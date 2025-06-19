#!/bin/bash

echo "Deploying El-portafolio to Vercel as a new app..."

# Install Vercel CLI if not already installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Login to Vercel
echo "Logging in to Vercel..."
vercel login

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod

echo "Deployment complete!"
echo "Use these credentials to log in:"
echo "Username: rmonteiro"
echo "Password: Junkie88"