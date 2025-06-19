#!/bin/bash

# This script helps deploy the Amplify backend using npx

echo "=== Deploying Amplify Backend ==="

# Step 1: Install dependencies locally
echo "Installing dependencies..."
npm install --save-dev @aws-amplify/cli

# Step 2: Initialize Amplify if not already initialized
if [ ! -d ".amplify" ]; then
    echo "Initializing Amplify..."
    npx amplify init
fi

# Step 3: Add AI capabilities
echo "Adding AI capabilities..."
npx amplify add custom

# Step 4: Push changes to AWS
echo "Pushing changes to AWS..."
npx amplify push

echo "=== Deployment Complete ==="
echo "Your Amplify backend with AI capabilities has been deployed!"
echo "Check the AWS Amplify Console for details."