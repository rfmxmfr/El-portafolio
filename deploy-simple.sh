#!/bin/bash

echo "Deploying El-portafolio to Vercel (simplified)..."

# Create a .vercelignore file to ignore problematic files
echo "Creating .vercelignore file..."
cat > .vercelignore << EOL
.eslintrc.js
.eslintrc.json
.eslintrc.cjs
.eslintignore
.github
.vscode
node_modules
EOL

# Create a simple vercel.json
echo "Creating simplified vercel.json..."
cat > vercel.json << EOL
{
  "version": 2,
  "buildCommand": "vite build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
EOL

# Deploy to Vercel
echo "Deploying to Vercel..."
npx vercel --prod

echo "Deployment complete!"
echo "Use these credentials to log in:"
echo "Username: rmonteiro"
echo "Password: Junkie88"