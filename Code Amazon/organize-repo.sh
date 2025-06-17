#!/bin/bash

# Create necessary directories if they don't exist
mkdir -p src/components
mkdir -p src/assets/images
mkdir -p src/styles
mkdir -p src/pages
mkdir -p scripts
mkdir -p docs

# Move component files to src/components
echo "Moving component files to src/components..."
for file in *.jsx; do
  if [[ "$file" != "App.jsx" && "$file" != "main.jsx" && -f "$file" ]]; then
    git mv "$file" src/components/ 2>/dev/null || mv "$file" src/components/
  fi
done

# Move image files to src/assets/images
echo "Moving image files to src/assets/images..."
for file in *.png; do
  if [ -f "$file" ]; then
    git mv "$file" src/assets/images/ 2>/dev/null || mv "$file" src/assets/images/
  fi
done

# Move CSS files to src/styles
echo "Moving CSS files to src/styles..."
for file in *.css; do
  if [[ "$file" != "index.css" && -f "$file" ]]; then
    git mv "$file" src/styles/ 2>/dev/null || mv "$file" src/styles/
  fi
done

# Move App.jsx and main.jsx to src if they're not already there
if [ -f "App.jsx" ]; then
  git mv "App.jsx" src/ 2>/dev/null || mv "App.jsx" src/
fi

if [ -f "main.jsx" ]; then
  git mv "main.jsx" src/ 2>/dev/null || mv "main.jsx" src/
fi

# Move deployment scripts to scripts directory
echo "Moving deployment scripts to scripts directory..."
for file in *.sh; do
  if [[ "$file" != "organize-repo.sh" && -f "$file" ]]; then
    git mv "$file" scripts/ 2>/dev/null || mv "$file" scripts/
  fi
done

# Move documentation files to docs directory
echo "Moving documentation files to docs directory..."
for file in *.md; do
  if [[ "$file" != "README.md" && -f "$file" ]]; then
    git mv "$file" docs/ 2>/dev/null || mv "$file" docs/
  fi
done

# Create a .gitattributes file to handle line endings consistently
echo "Creating .gitattributes file..."
cat > .gitattributes << EOL
# Set default behavior to automatically normalize line endings
* text=auto

# Explicitly declare text files to be normalized
*.js text
*.jsx text
*.json text
*.html text
*.css text
*.md text
*.yml text
*.yaml text
*.toml text

# Declare binary files that should not be modified
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.ico binary
*.zip binary
EOL

echo "Repository organization complete!"
echo "Please review the changes and commit them with: git add . && git commit -m \"Reorganize repository structure\""