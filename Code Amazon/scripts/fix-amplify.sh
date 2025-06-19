#!/bin/bash

# Fix npm issues and set up Amplify

# Check Node.js version
echo "Node.js version:"
node -v

# Check npm version
echo "npm version:"
npm -v

# Clear npm cache
echo "Clearing npm cache..."
npm cache clean --force

# Install Amplify directly
echo "Installing Amplify..."
npm install --save aws-amplify

# Initialize Amplify using npx
echo "Initializing Amplify..."
npx -y create-amplify

echo "Setup complete. If successful, run: npx amplify sandbox"