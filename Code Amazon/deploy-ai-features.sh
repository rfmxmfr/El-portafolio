#!/bin/bash

echo "Starting deployment of AI features..."

# Build the application
echo "Building the application..."
npm run build

# Deploy to Netlify (using the existing configuration)
echo "Deploying to Netlify..."
npm run netlify

# If using AWS Amplify, uncomment these lines
# echo "Deploying to AWS Amplify..."
# npm run deploy:amplify

echo "Deployment complete! The AI and ML features are now live."