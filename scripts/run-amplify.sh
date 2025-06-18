#!/bin/bash

# Full path script for Amplify Gen 2 setup

# Change to project directory
cd /Users/renato/Desktop/El-PortafolioTania\(Local\)/El-portafolio

# Install dependencies
npm install aws-amplify @aws-amplify/ui-react

# Initialize Amplify Gen 2
npx create-amplify@latest

# After initialization completes, start sandbox
echo "Starting Amplify sandbox..."
npx amplify sandbox