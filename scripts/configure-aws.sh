#!/bin/bash

echo "AWS Credentials Configuration"
echo "============================"
echo ""

# Prompt for credentials
read -p "Enter your AWS Access Key ID: " AWS_ACCESS_KEY_ID
read -p "Enter your AWS Secret Access Key: " AWS_SECRET_ACCESS_KEY
read -p "Enter your preferred AWS region (default: us-east-1): " AWS_REGION

# Set default region if not provided
if [ -z "$AWS_REGION" ]; then
  AWS_REGION="us-east-1"
fi

# Create credentials file
mkdir -p ~/.aws
cat > ~/.aws/credentials << EOF
[default]
aws_access_key_id = $AWS_ACCESS_KEY_ID
aws_secret_access_key = $AWS_SECRET_ACCESS_KEY
EOF

# Create config file
cat > ~/.aws/config << EOF
[default]
region = $AWS_REGION
output = json
EOF

echo ""
echo "AWS credentials have been configured!"
echo "Please restart VS Code for changes to take effect."