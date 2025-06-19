#!/bin/bash

# Add all changes including new directories and files
git add -A

# Commit the changes
git commit -m "Reorganize repository structure"

# Push to GitHub
git push origin main

echo "Changes committed and pushed to GitHub!"