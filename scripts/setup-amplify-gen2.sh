#!/bin/bash

# Setup script for AWS Amplify Gen 2

echo "Setting up AWS Amplify Gen 2..."

# Install dependencies
echo "Installing dependencies..."
npm install aws-amplify @aws-amplify/ui-react

# Navigate to amplify directory
cd amplify

# Install backend dependencies
echo "Installing backend dependencies..."
npm install

# Create amplify.env.js file
echo "Creating environment configuration..."
cat > ../src/amplify.env.js << EOF
// This file contains environment-specific settings for Amplify
export const amplifyEnvironment = {
  region: 'us-east-1'
};
EOF

echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Run 'cd amplify && npm run sandbox' to start the local sandbox"
echo "2. After sandbox starts, update src/amplifyconfiguration.ts with the generated values"
echo "3. Run 'npm run dev' to start your application"
echo ""
echo "To deploy to AWS:"
echo "1. Make sure your AWS credentials are configured"
echo "2. Run 'cd amplify && npm run deploy'"