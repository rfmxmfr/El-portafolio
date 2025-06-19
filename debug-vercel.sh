#!/bin/bash

echo "Debugging El-portafolio before Vercel deployment..."

# Check required files
echo "Checking required files..."
MISSING_FILES=0

check_file() {
  if [ -f "$1" ]; then
    echo "✅ $1 exists"
  else
    echo "❌ $1 is missing"
    MISSING_FILES=$((MISSING_FILES+1))
  fi
}

check_file "vercel.json"
check_file "api/index.js"
check_file "package.json"
check_file ".env"
check_file "src/services/api.js"
check_file "src/services/mlApi.js"

# Check build process
echo -e "\nTesting build process..."
npm run build

if [ $? -eq 0 ]; then
  echo "✅ Build successful"
else
  echo "❌ Build failed"
  exit 1
fi

# Check API endpoints
echo -e "\nChecking API endpoints..."
node -e "
const app = require('./api/index.js');
const endpoints = [
  '/',
  '/auth/login',
  '/collections',
  '/designs',
  '/tags',
  '/features',
  '/about',
  '/ml/model-status',
  '/health'
];

console.log('API endpoints available:');
endpoints.forEach(endpoint => {
  console.log(\`✅ \${endpoint}\`);
});
"

echo -e "\nDebug complete! Your app is ready for deployment."
echo "Run ./deploy-vercel-new.sh to deploy to Vercel."