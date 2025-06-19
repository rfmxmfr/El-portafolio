#!/bin/bash

echo "Deploying El-portafolio to Vercel (clean approach)..."

# Create a temporary directory for deployment
TEMP_DIR=$(mktemp -d)
echo "Created temporary directory: $TEMP_DIR"

# Copy necessary files to temp directory
echo "Copying files to temporary directory..."
cp -r src $TEMP_DIR/
cp -r public $TEMP_DIR/ 2>/dev/null || mkdir $TEMP_DIR/public
cp index.html $TEMP_DIR/ 2>/dev/null || touch $TEMP_DIR/index.html
cp vite.config.js $TEMP_DIR/
cp api/index.js $TEMP_DIR/api.js
mkdir -p $TEMP_DIR/api
cp api/index.js $TEMP_DIR/api/index.js

# Create a clean package.json
echo "Creating clean package.json..."
cat > $TEMP_DIR/package.json << EOL
{
  "name": "el-portafolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-tabs": "^1.0.4",
    "axios": "^1.6.2",
    "bcryptjs": "^2.4.3",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "i18next": "^23.7.7",
    "jsonwebtoken": "^9.0.2",
    "lucide-react": "^0.294.0",
    "react": "^18.2.0",
    "react-beautiful-dnd": "^13.1.1",
    "react-dom": "^18.2.0",
    "react-i18next": "^13.5.0",
    "react-masonry-css": "^1.0.16",
    "react-router-dom": "^6.20.1",
    "tailwind-merge": "^2.1.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "vite": "^5.0.0"
  }
}
EOL

# Create a clean vercel.json
echo "Creating clean vercel.json..."
cat > $TEMP_DIR/vercel.json << EOL
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
EOL

# Create a clean .env file
echo "Creating .env file..."
cat > $TEMP_DIR/.env << EOL
VITE_API_URL=/api
VITE_ML_API_URL=/api/ml
EOL

# Change to temp directory
cd $TEMP_DIR

# Deploy to Vercel
echo "Deploying to Vercel..."
npx vercel --prod

echo "Deployment complete!"
echo "Use these credentials to log in:"
echo "Username: rmonteiro"
echo "Password: Junkie88"

# Clean up
echo "Cleaning up temporary directory..."
cd -
rm -rf $TEMP_DIR