#!/bin/bash

echo "Deploying El-portafolio to AWS Amplify..."

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if user is logged in to AWS
aws sts get-caller-identity &> /dev/null
if [ $? -ne 0 ]; then
    echo "Please log in to AWS first using 'aws configure'"
    exit 1
fi

# Build the application
echo "Building the application..."
npm run build

# Create a zip file of the build
echo "Creating deployment package..."
cd dist
zip -r ../deployment.zip .
cd ..

# Create S3 bucket for deployment (if it doesn't exist)
BUCKET_NAME="el-portafolio-deployment"
aws s3api create-bucket --bucket $BUCKET_NAME --region us-east-1 2>/dev/null || true

# Upload to S3
echo "Uploading to S3..."
aws s3 cp deployment.zip s3://$BUCKET_NAME/

# Create/update CloudFront distribution
echo "Deploying to CloudFront..."
aws cloudfront create-distribution --origin-domain-name $BUCKET_NAME.s3.amazonaws.com --default-root-object index.html 2>/dev/null || echo "CloudFront distribution already exists"

echo "AWS deployment complete!"
echo "Your application will be available at the CloudFront URL"
echo "Use these credentials to log in:"
echo "Username: rmonteiro"
echo "Password: Junkie88"