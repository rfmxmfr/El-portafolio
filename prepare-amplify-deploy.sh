#!/bin/bash

# Build the application
echo "Building the application..."
npm run build

# Create a zip file of the dist directory
echo "Creating a zip file of the dist directory..."
zip -r dist.zip dist

echo "==================================================="
echo "Your application is now ready for deployment to AWS Amplify!"
echo "==================================================="
echo ""
echo "To deploy using the AWS Amplify Console:"
echo ""
echo "1. Go to the AWS Amplify Console: https://console.aws.amazon.com/amplify/home"
echo "2. Click 'New app' > 'Host web app'"
echo ""
echo "Option 1: Deploy from Git repository"
echo "- Select your Git provider"
echo "- Connect to your repository"
echo "- Select the branch you want to deploy"
echo "- Follow the setup wizard"
echo ""
echo "Option 2: Deploy manually (without Git)"
echo "- Click 'Deploy without Git provider'"
echo "- Enter an app name (e.g., 'fashion-portfolio')"
echo "- For 'Environment name', enter 'prod' or 'dev'"
echo "- Click 'Next'"
echo "- Upload the 'dist.zip' file that was just created"
echo "- Click 'Save and deploy'"
echo ""
echo "For more detailed instructions, see AMPLIFY_CONSOLE_DEPLOYMENT.md"
echo ""
echo "==================================================="