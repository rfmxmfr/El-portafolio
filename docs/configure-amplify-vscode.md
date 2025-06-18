# Configuring AWS Amplify in VS Code

## Step 1: Fix Your AWS Credentials

Your AWS Secret Access Key appears to be incorrect. A Secret Access Key:
- Is much longer than an Access Key ID
- Does not start with "AKIA"
- Looks like: `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`

## Step 2: Get New Credentials

1. Go to [AWS IAM Console](https://console.aws.amazon.com/iam/home#/security_credentials)
2. Under "Access keys", create a new access key
3. Save both the Access Key ID and Secret Access Key

## Step 3: Configure AWS CLI

Run:
```bash
./configure-aws.sh
```

Enter your correct credentials when prompted.

## Step 4: Configure VS Code

1. Restart VS Code
2. Open Command Palette (Cmd+Shift+P)
3. Type "AWS: Connect to AWS"
4. Select your profile

## Step 5: Initialize Amplify

In your project directory:
```bash
npx @aws-amplify/cli init
```

Follow the prompts to set up your Amplify project.

## Step 6: Use Amplify in VS Code

1. Open AWS Explorer sidebar (AWS icon)
2. Expand "Amplify"
3. Your project should appear here

If you continue having issues, try using the Amplify CLI directly:
```bash
npx @aws-amplify/cli init
npx @aws-amplify/cli add api
npx @aws-amplify/cli push
```