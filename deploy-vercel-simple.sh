#!/bin/bash

echo "Deploying El-portafolio to Vercel (simple mode)..."

# Deploy directly to Vercel without local build
# This lets Vercel handle the build process
npx vercel --prod

echo "Deployment complete!"