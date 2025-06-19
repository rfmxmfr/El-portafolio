#!/bin/bash

# Script to set up AWS Amplify Studio environment and deploy

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "AWS CLI is not installed. Please install it first."
    exit 1
fi

# Install Amplify CLI if not already installed
echo "Installing/updating Amplify CLI..."
npm install -g @aws-amplify/cli

# Ensure npm global binaries are in PATH
export PATH="$PATH:$(npm bin -g)"

# Verify Amplify is installed
if ! command -v amplify &> /dev/null; then
    echo "Failed to install Amplify CLI. Please install it manually with: npm install -g @aws-amplify/cli"
    exit 1
fi

# Initialize Amplify project
echo "Initializing Amplify project..."
amplify init

# Add authentication
echo "Adding authentication..."
amplify add auth

# Add Amplify Studio UI components
echo "Setting up Amplify Studio..."
amplify add ui-components

# Push changes to the cloud
echo "Deploying Amplify resources to the cloud..."
amplify push -y

# Open Amplify Studio in the browser
echo "Opening Amplify Studio in the browser..."
amplify studio ui

echo "Amplify Studio environment has been set up and deployed successfully!"