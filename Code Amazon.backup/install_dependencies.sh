#!/bin/bash

cd /Users/renato/Documents/GitHub/El-portafolio

# Check if package.json exists in the backend directory
if [ -f "./backend/package.json" ]; then
  cd ./backend
  
  # Check if express-validator is installed
  if ! grep -q "express-validator" package.json; then
    echo "Installing express-validator..."
    npm install --save express-validator
  fi
  
  # Check if sanitize-html is installed
  if ! grep -q "sanitize-html" package.json; then
    echo "Installing sanitize-html..."
    npm install --save sanitize-html
  fi
  
  echo "Dependencies installed successfully!"
else
  echo "Error: package.json not found in backend directory"
  exit 1
fi
