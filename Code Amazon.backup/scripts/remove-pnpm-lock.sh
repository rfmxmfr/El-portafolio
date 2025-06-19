#!/bin/sh

# Script to remove pnpm-lock.yaml and switch to npm

set -e

echo "Checking for pnpm-lock.yaml..."

# Remove pnpm-lock.yaml if it exists
if [ -f "pnpm-lock.yaml" ]; then
  echo "Removing pnpm-lock.yaml..."
  rm pnpm-lock.yaml
  echo "pnpm-lock.yaml removed successfully."
else
  echo "pnpm-lock.yaml not found."
fi

# Remove packageManager field from package.json if it exists
if grep -q "packageManager" package.json; then
  echo "Removing packageManager field from package.json..."
  # Use sed to remove the packageManager line
  sed -i '' '/packageManager/d' package.json
  echo "packageManager field removed from package.json."
else
  echo "No packageManager field found in package.json."
fi

echo "Creating .npmrc file..."
echo "legacy-peer-deps=true" > .npmrc
echo ".npmrc file created."

echo "Done! You can now use npm instead of pnpm."
echo "Run 'npm install' to generate package-lock.json"