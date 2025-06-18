# Deploying to AWS Amplify

This guide will help you deploy your React application to AWS Amplify.

## Prerequisites

1. An AWS account
2. AWS CLI installed and configured
3. Git repository with your code (GitHub, GitLab, BitBucket, or AWS CodeCommit)

## Option 1: Deploy via AWS Amplify Console (Recommended)

1. Go to the [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" > "Host web app"
3. Connect to your Git provider and select your repository
4. Select the branch you want to deploy (e.g., `main` or `master`)
5. Configure build settings:
   - The `amplify.yml` file in your repository will be used automatically
   - Alternatively, you can use the default settings provided by Amplify
6. Review and click "Save and deploy"

## Option 2: Deploy via Amplify CLI

1. Install the Amplify CLI if you haven't already:
   ```
   npm install -g @aws-amplify/cli
   ```

2. Initialize Amplify in your project:
   ```
   amplify init
   ```

3. Add hosting:
   ```
   amplify add hosting
   ```

4. Publish your app:
   ```
   amplify publish
   ```

## Manual Deployment

1. Build your application:
   ```
   npm run build
   ```

2. Deploy the contents of the `dist` folder to AWS Amplify using the Amplify Console.

## Important Notes

- Client-side routing is configured with the `_redirects` file and `rewrite-rules.json` in the `public` directory
- The application is configured to build to the `dist` directory
- Make sure your AWS credentials are properly configured before deploying