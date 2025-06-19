#!/bin/bash

echo "Deploying El-portafolio to Vercel (direct mode)..."

# Deploy directly to Vercel with minimal configuration
npx vercel --prod --force

echo "Deployment complete!"