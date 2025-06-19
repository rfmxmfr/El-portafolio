#!/bin/bash

echo "Debugging El-portafolio frontend..."

# Check for required dependencies
echo "Checking dependencies..."
npm ls react react-dom react-router-dom axios

# Check for build issues
echo -e "\nChecking for build issues..."
npm run build

# Check for linting issues
echo -e "\nChecking for linting issues..."
if command -v npm run lint &> /dev/null; then
  npm run lint
else
  echo "Linting not configured, skipping"
fi

# Check environment variables
echo -e "\nChecking environment variables..."
if [ -f ".env" ]; then
  echo "Environment variables found:"
  cat .env | grep -v "^#" | grep "."
else
  echo "No .env file found"
fi

# Check routing configuration
echo -e "\nChecking routing configuration..."
if [ -f "src/main.jsx" ]; then
  echo "Routes defined in main.jsx:"
  grep -A 20 "createBrowserRouter" src/main.jsx
else
  echo "main.jsx not found"
fi

echo -e "\nFrontend debug complete!"