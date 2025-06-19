#!/bin/bash

echo "Deploying El-portafolio to Vercel (fixed)..."

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

# Deploy to Vercel
echo "Deploying to Vercel..."
npx vercel --prod

echo "Deployment complete!"
echo "Use these credentials to log in:"
echo "Username: rmonteiro"
echo "Password: Junkie88"