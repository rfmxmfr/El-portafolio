#!/bin/bash

echo "Running complete debug for El-portafolio..."

# Run file checks
echo -e "\n=== CHECKING FILES ===\n"
./debug-vercel.sh

# Run frontend checks
echo -e "\n=== CHECKING FRONTEND ===\n"
./debug-frontend.sh

# Test API
echo -e "\n=== TESTING API ===\n"
echo "Starting API test server..."
echo "Press Ctrl+C after a few seconds to continue"
node test-api.js

echo -e "\n=== DEBUG COMPLETE ===\n"
echo "If all checks passed, you can deploy with:"
echo "./deploy-vercel-new.sh"