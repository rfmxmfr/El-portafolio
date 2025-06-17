#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Deploy to Netlify using npx (no global installation needed)
echo "Deploying to Netlify..."
npx netlify-cli deploy --prod --dir=dist

echo "Deployment complete!"