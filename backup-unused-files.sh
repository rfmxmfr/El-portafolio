#!/bin/bash

# Create backup directory
mkdir -p unused-files-backup

# List of files to backup and remove
files=(
"api/hello.js"
"api/index.js"
"backend/auth/authService.js"
"backend/controllers/aboutController.js"
"backend/controllers/authController.js"
"backend/controllers/collectionController.js"
"backend/controllers/designController.js"
"backend/controllers/featureController.js"
"backend/controllers/tagController.js"
"backend/controllers/uploadController.js"
"backend/middleware/auth.js"
"backend/middleware/errorHandler.js"
"backend/middleware/rateLimiter.js"
"backend/mockData.js"
"backend/models/About.js"
"backend/models/Collection.js"
"backend/models/Design.js"
"backend/models/Feature.js"
"backend/models/Tag.js"
"backend/models/User.js"
"backend/routes/about.js"
"backend/routes/auth.js"
"backend/routes/collections.js"
"backend/routes/designs.js"
"backend/routes/features.js"
"backend/routes/tags.js"
"backend/routes/uploads.js"
"backend/scripts/create-admin.js"
"backend/seed.js"
"backend/server.js"
"backend/utils/cookie.js"
)

# Copy files to backup directory maintaining structure
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        mkdir -p "unused-files-backup/$(dirname "$file")"
        cp "$file" "unused-files-backup/$file"
        echo "Backed up: $file"
    fi
done

# Create zip archive
zip -r unused-files-backup-$(date +%Y%m%d).zip unused-files-backup/

# Create backup branch
git checkout -b unused-files-backup
git add unused-files-backup/
git commit -m "Backup unused files before cleanup"
git push origin unused-files-backup

# Switch back to main branch
git checkout main

# Remove original files
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        rm "$file"
        echo "Removed: $file"
    fi
done

# Remove empty directories
find . -type d -empty -delete

# Commit changes
git add -A
git commit -m "Remove unused files identified by knip"
git push origin main

echo "Backup complete! Files archived in unused-files-backup branch and local zip file."