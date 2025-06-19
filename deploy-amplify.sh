#!/bin/bash

# Deploy to AWS Amplify script
echo "Preparing for Amplify deployment..."

# Ensure we have the latest dependencies
npm ci

# Build the application
npm run build

# Copy redirects file to ensure it's in the build
cp public/_redirects dist/

# Create a rewrite rule file for Amplify
cat > dist/rewrite-rules.json << EOL
[
  {
    "source": "</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)([^.]+$)/>",
    "target": "/index.html",
    "status": "200"
  }
]
EOL

echo "Build completed and ready for Amplify deployment"
echo "Make sure to configure the following in Amplify Console:"
echo "1. Set build settings to use amplify.yml"
echo "2. Add rewrites and redirects in the Amplify Console for SPA routing"
echo "3. Verify environment variables are set correctly"

# Make the script executable with: chmod +x deploy-amplify.sh