#!/bin/sh

# Script to fix dependency issues by aligning package.json and lock files

set -e

echo "Checking for i18next and react-i18next in package.json..."

# Remove pnpm-lock.yaml if it exists
if [ -f "pnpm-lock.yaml" ]; then
  echo "Removing pnpm-lock.yaml..."
  rm pnpm-lock.yaml
fi

# Add i18next and react-i18next if not present
echo "Adding i18next and react-i18next using npm..."
npm install --save i18next@^23.10.0 react-i18next@^14.0.5

echo "Installing all dependencies to update package-lock.json..."
npm install

echo "Staging changes..."
git add package.json package-lock.json

echo "Committing changes..."
git commit -m "fix: update dependencies and package-lock.json to resolve dependency issues"

echo "Done! Your dependencies and lockfile are now in sync."