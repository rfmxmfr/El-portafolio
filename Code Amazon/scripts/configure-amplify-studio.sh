#!/bin/bash
set -e

echo "🚀 Configuring AWS Amplify Studio for your Fashion Portfolio project"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    echo "Visit: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

# Check if AWS is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS CLI is not configured. Please run 'aws configure' first."
    exit 1
fi

# Check if Amplify CLI is installed
if ! command -v amplify &> /dev/null; then
    echo "📦 Installing Amplify CLI..."
    npm install -g @aws-amplify/cli
fi

# Install required dependencies
echo "📦 Installing required dependencies..."
npm install aws-amplify @aws-amplify/ui-react

# Initialize Amplify Studio if not already initialized
if [ ! -d "amplify/studio" ]; then
    echo "🏗️ Initializing Amplify Studio..."
    amplify init
    
    # Add authentication
    echo "🔐 Adding authentication..."
    amplify add auth --service cognito \
        --serviceName cognito \
        --userPoolName fashionPortfolioUserPool \
        --usernameAttributes email \
        --mfa OFF \
        --socialProviders \
        --adminQueries \
        --thirdPartyAuth \
        --identityPoolName fashionPortfolioIdentityPool \
        --allowUnauthenticatedIdentities \
        --conflictResolution AUTO_MERGE
    
    # Add API for designs and collections
    echo "🔌 Adding API for designs and collections..."
    amplify add api --service AppSync \
        --apiName fashionPortfolioAPI \
        --defaultAuthType API_KEY \
        --conflictResolution AUTO_MERGE
    
    # Add storage for design images
    echo "💾 Adding storage for design images..."
    amplify add storage --service S3 \
        --resourceName fashionPortfolioStorage \
        --bucketName fashion-portfolio-storage-$(date +%s) \
        --authPerm auth \
        --unauthPerm public \
        --corsConfiguration
fi

# Enable Amplify Studio UI features
echo "🎨 Enabling Amplify Studio UI features..."
amplify add custom --service studio

# Push changes to the cloud
echo "☁️ Pushing changes to the cloud..."
amplify push --y

# Generate Amplify Studio configuration
echo "⚙️ Generating Amplify Studio configuration..."
amplify codegen

# Create Amplify Studio configuration file
echo "📝 Creating Amplify Studio configuration file..."
cat > src/amplify-studio-config.js << EOL
import { createTheme } from '@aws-amplify/ui-react';

// Custom theme for Amplify Studio UI components
export const studioTheme = createTheme({
  name: 'fashion-portfolio-theme',
  tokens: {
    colors: {
      brand: {
        primary: { value: '#FF4785' },
        secondary: { value: '#1EA7FD' }
      },
      font: {
        interactive: { value: '#323232' }
      },
      background: {
        primary: { value: '#FFFFFF' },
        secondary: { value: '#F5F5F5' }
      }
    },
    fonts: {
      default: {
        variable: { value: "'Inter', sans-serif" },
        static: { value: "'Inter', sans-serif" }
      }
    }
  }
});

// Amplify Studio configuration
export const studioConfig = {
  projectId: 'fashion-portfolio',
  appId: process.env.AMPLIFY_APP_ID || 'your-amplify-app-id',
  region: process.env.AWS_REGION || 'us-east-1',
  authenticationType: 'AWS_IAM'
};
EOL

# Update main App.jsx to include Amplify Studio configuration
echo "🔄 Updating App.jsx to include Amplify Studio configuration..."
TEMP_FILE=$(mktemp)
cat > $TEMP_FILE << 'EOL'
import { Amplify } from 'aws-amplify';
import { AmplifyProvider } from '@aws-amplify/ui-react';
import { studioTheme } from './amplify-studio-config';
import '@aws-amplify/ui-react/styles.css';
import { amplifyConfig } from './amplify-config';

// Initialize Amplify
Amplify.configure(amplifyConfig);

EOL

# Find the import section in App.jsx and append our imports
sed -i.bak '/^import/,/^$/!b;/^$/i\
'"$(cat $TEMP_FILE)"'' src/App.jsx

# Wrap the app with AmplifyProvider
sed -i.bak 's/<React.StrictMode>/<AmplifyProvider theme={studioTheme}>/g' src/App.jsx
sed -i.bak 's/<\/React.StrictMode>/<\/AmplifyProvider>/g' src/App.jsx

# Clean up
rm $TEMP_FILE
rm src/App.jsx.bak

echo "✅ Amplify Studio configuration complete!"
echo "🌐 Open the AWS Amplify Console to access Amplify Studio:"
echo "    https://console.aws.amazon.com/amplify/home"
echo ""
echo "📚 Next steps:"
echo "  1. Run 'amplify studio' to open Amplify Studio locally"
echo "  2. Design your UI components in Amplify Studio"
echo "  3. Generate and export UI components with 'amplify pull'"
echo "  4. Import and use the components in your React application"