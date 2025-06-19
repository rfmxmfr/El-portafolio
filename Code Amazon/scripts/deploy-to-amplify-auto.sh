#!/bin/bash

# Set app name
APP_NAME="fashion-portfolio-$(date +%Y%m%d%H%M%S)"

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

# Create the Amplify app
echo "Creating Amplify app with name: $APP_NAME"
APP_ID=$(aws amplify create-app --name "$APP_NAME" --query 'app.appId' --output text)

if [ -z "$APP_ID" ]; then
    echo "Failed to create Amplify app."
    exit 1
fi

echo "App created with ID: $APP_ID"

# Create a branch
echo "Creating branch..."
aws amplify create-branch --app-id "$APP_ID" --branch-name main

# Create the deployment
echo "Creating deployment..."
DEPLOYMENT_ID=$(aws amplify create-deployment --app-id "$APP_ID" --branch-name main --query 'jobId' --output text)

if [ -z "$DEPLOYMENT_ID" ]; then
    echo "Failed to create deployment."
    exit 1
fi

echo "Deployment created with ID: $DEPLOYMENT_ID"

# Get the upload URL
echo "Getting upload URL..."
UPLOAD_URL=$(aws amplify get-deployment --app-id "$APP_ID" --branch-name main --job-id "$DEPLOYMENT_ID" --query 'zipUploadUrl' --output text)

if [ -z "$UPLOAD_URL" ]; then
    echo "Failed to get upload URL."
    exit 1
fi

# Zip the dist directory
echo "Zipping the dist directory..."
zip -r dist.zip dist

# Upload the zip file
echo "Uploading the zip file..."
curl -H "Content-Type: application/zip" --upload-file dist.zip "$UPLOAD_URL"

# Start the deployment
echo "Starting the deployment..."
aws amplify start-deployment --app-id "$APP_ID" --branch-name main --job-id "$DEPLOYMENT_ID"

echo "Deployment started. You can check the status in the AWS Amplify Console:"
echo "https://console.aws.amazon.com/amplify/home?region=$(aws configure get region)#/$APP_ID"

# Clean up
rm dist.zip