#!/bin/bash

# Pull latest changes from remote
git pull origin main

# Add all changes
git add .

# Commit changes
git commit -m "Add Vercel deployment configuration and fix collectionController.js"

# Push to GitHub
git push origin main

echo "GitHub repository updated successfully!"