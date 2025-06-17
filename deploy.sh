#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null
then
    echo "Netlify CLI not found, installing..."
    npm install -g netlify-cli
fi

# Deploy to Netlify
echo "Deploying to Netlify..."
netlify deploy --prod --dir=dist

echo "Deployment complete!"