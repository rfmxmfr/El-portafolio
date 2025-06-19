#!/bin/bash

# Setup script for Amplify Gen 2 (fresh start)

# Install Amplify library in main project
npm install --save aws-amplify

# Create a new directory for Amplify Gen 2
mkdir -p amplify-gen2
cd amplify-gen2

# Initialize a new package.json
echo '{
  "name": "amplify-backend",
  "version": "0.1.0",
  "type": "module",
  "private": true
}' > package.json

# Install Amplify Gen 2 dependencies
npm install @aws-amplify/backend aws-cdk-lib constructs typescript

# Go back to project root
cd ..

# Initialize Amplify Gen 2
echo "Initializing Amplify Gen 2 in a new directory..."
npx create-amplify@latest --path amplify-gen2

echo "Setup complete. If successful, run: cd amplify-gen2 && npx amplify sandbox"