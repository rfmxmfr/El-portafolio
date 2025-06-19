#!/bin/bash

# Script to deploy El-portafolio to Netlify

echo "🚀 Starting Netlify deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "🔧 Installing Netlify CLI..."
    npm install netlify-cli -g
fi

# Deploy to Netlify
echo "🚀 Deploying to Netlify..."
netlify deploy --dir=dist --prod

echo "✅ Deployment complete! Check the URL above to view your site."