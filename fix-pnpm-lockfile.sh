#!/bin/sh

# Script to fix ERR_PNPM_OUTDATED_LOCKFILE by aligning package.json and pnpm-lock.yaml

set -e

echo "Checking for i18next@^23.10.0 and react-i18next in package.json..."

# Add i18next and react-i18next if not present
pnpm add i18next@^23.10.0 react-i18next

echo "Installing dependencies to update pnpm-lock.yaml..."
pnpm install

echo "Staging changes..."
git add package.json pnpm-lock.yaml

echo "Committing changes..."
git commit -m "fix: update dependencies and pnpm-lock.yaml to resolve ERR_PNPM_OUTDATED_LOCKFILE"

echo "Done! Your dependencies and lockfile are now in sync."