#!/bin/sh

# Script to fix i18next integration

set -e

echo "Checking i18next integration..."

# Make sure src/lib/i18n.js exists
if [ ! -f "src/lib/i18n.js" ]; then
  echo "Creating src/lib/i18n.js..."
  mkdir -p src/lib
  cp i18n.js src/lib/i18n.js
  echo "src/lib/i18n.js created."
fi

# Update main.jsx to import from src/lib/i18n.js
echo "Updating main.jsx..."
sed -i '' 's|import '\''./i18n.js'\''|import '\''./src/lib/i18n.js'\''|g' main.jsx
echo "main.jsx updated."

# Make sure App.jsx imports useTranslation
echo "Checking App.jsx..."
if ! grep -q "useTranslation" App.jsx; then
  echo "Adding useTranslation import to App.jsx..."
  sed -i '' '1s/^/import { useTranslation } from '\''react-i18next'\''\n/' App.jsx
  echo "App.jsx updated."
fi

# Make sure App.jsx uses useTranslation
if ! grep -q "const { t } = useTranslation()" App.jsx; then
  echo "Adding useTranslation hook to App.jsx..."
  sed -i '' '/function App() {/a\\n  const { t } = useTranslation()' App.jsx
  echo "App.jsx updated."
fi

echo "Building the project..."
npm run build

echo "Done! i18next integration should now be fixed."