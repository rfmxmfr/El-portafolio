#!/bin/bash

# Simple setup script for AWS Amplify Gen 2

# Install dependencies
npm install aws-amplify @aws-amplify/ui-react

# Create amplify directory if it doesn't exist
mkdir -p amplify/data/function amplify/auth

# Install backend dependencies
cd amplify
npm install @aws-amplify/backend @aws-amplify/backend-cli aws-cdk-lib constructs typescript

echo "Setup complete!"
echo "Run 'npx amplify sandbox' to start the local sandbox"