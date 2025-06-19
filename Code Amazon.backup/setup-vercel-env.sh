#!/bin/bash

# This script sets up environment variables for Vercel deployment

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "Setting up environment variables for Vercel..."

# Set environment variables
vercel env add MONGODB_URI production
vercel env add JWT_SECRET production
vercel env add FRONTEND_URL production
vercel env add NODE_ENV production

echo "Environment variables set up complete!"
echo "Note: You will be prompted to enter values for each variable."
echo "For the FRONTEND_URL, use your Vercel deployment URL."