# Deploying to AWS Amplify via the Console

This guide will walk you through deploying your React application to AWS Amplify using the AWS Management Console.

## Prerequisites

1. An AWS account
2. Your application code in a Git repository (GitHub, GitLab, BitBucket, or AWS CodeCommit)
3. OR your built application files (in the `dist` directory)

## Option 1: Deploy from Git Repository (Recommended)

1. **Push your code to a Git repository**
   - Make sure your repository includes the `amplify.yml` file at the root

2. **Access the AWS Amplify Console**
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/home)
   - Sign in with your AWS account

3. **Create a new app**
   - Click "New app" > "Host web app"
   - Select your Git provider (GitHub, GitLab, BitBucket, or AWS CodeCommit)
   - Authorize AWS Amplify to access your repositories
   - Select your repository and branch

4. **Configure build settings**
   - The `amplify.yml` file in your repository will be used automatically
   - Review the build settings and make any necessary adjustments
   - Click "Next"

5. **Review and deploy**
   - Review your settings
   - Click "Save and deploy"

6. **Wait for deployment**
   - Amplify will clone your repository, build your application, and deploy it
   - Once complete, you'll receive a URL where your application is hosted

## Option 2: Deploy Manually (Without Git)

1. **Build your application**
   ```
   npm run build
   ```

2. **Access the AWS Amplify Console**
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/home)
   - Sign in with your AWS account

3. **Create a new app**
   - Click "New app" > "Host web app" > "Deploy without Git provider"

4. **Configure your app**
   - Enter an app name (e.g., "fashion-portfolio")
   - For "Environment name", enter "prod" or "dev"
   - Click "Next"

5. **Upload your build files**
   - Zip the contents of your `dist` directory:
     ```
     cd /Users/renato/Desktop/El-PortafolioTania(Local)/El-portafolio
     zip -r dist.zip dist
     ```
   - Click "Choose files" and select your `dist.zip` file
   - Click "Save and deploy"

6. **Wait for deployment**
   - Amplify will extract your files and deploy them
   - Once complete, you'll receive a URL where your application is hosted

## Post-Deployment

1. **Custom Domain (Optional)**
   - In the Amplify Console, go to your app
   - Click "Domain management" in the left sidebar
   - Click "Add domain"
   - Follow the instructions to set up your custom domain

2. **Environment Variables (If needed)**
   - In the Amplify Console, go to your app
   - Click "Environment variables" in the left sidebar
   - Add any environment variables your application needs

3. **Redirects and Rewrites**
   - Your application already has `_redirects` and `rewrite-rules.json` in the `public` directory
   - These will be used automatically to handle client-side routing

## Troubleshooting

- If you encounter build errors, check the build logs in the Amplify Console
- Make sure your `amplify.yml` file is correctly configured
- Verify that your application builds successfully locally before deploying
- Check that your environment variables are correctly set in the Amplify Console