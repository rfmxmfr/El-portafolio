#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "AWS CLI is not installed. Please install it first."
    echo "Visit: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

# Check if user is logged in to AWS
if ! aws sts get-caller-identity &> /dev/null; then
    echo "You are not logged in to AWS. Please run 'aws configure' first."
    exit 1
fi

# Check if Amplify CLI is installed
if ! command -v amplify &> /dev/null; then
    echo "AWS Amplify CLI is not installed. Installing now..."
    npm install -g @aws-amplify/cli
fi

echo "To deploy to AWS Amplify, you have two options:"
echo ""
echo "Option 1: Deploy via AWS Amplify Console (Recommended)"
echo "1. Go to https://console.aws.amazon.com/amplify/"
echo "2. Click 'New app' > 'Host web app'"
echo "3. Connect to your GitHub/BitBucket/GitLab repository"
echo "4. Follow the setup wizard (the amplify.yml file will be used automatically)"
echo ""
echo "Option 2: Deploy via Amplify CLI"
echo "Run the following commands:"
echo "amplify init"
echo "amplify add hosting"
echo "amplify publish"
echo ""
echo "Your built files are in the 'dist' directory ready for deployment."