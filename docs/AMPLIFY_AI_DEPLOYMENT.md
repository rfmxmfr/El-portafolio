# Deploying Amplify with AI Capabilities

Since we're encountering permission issues with the CLI, follow these steps to deploy using the AWS Amplify Console:

## Step 1: Access AWS Amplify Console

1. Go to the [AWS Amplify Console](https://console.aws.amazon.com/amplify/home)
2. Sign in with your AWS account

## Step 2: Connect Your Repository

1. Click "New app" > "Host web app"
2. Select GitHub as your repository source
3. Connect to your GitHub account
4. Select the `El-portafolio` repository
5. Select the `main` branch
6. Click "Next"

## Step 3: Configure Build Settings

The build settings should be automatically detected from your `amplify.yml` file. If not:

1. Use the following build settings:

```yaml
version: 1
backend:
  phases:
    build:
      commands:
        - npm install
        - npm run deploy
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

2. Click "Next"

## Step 4: Review and Deploy

1. Review your settings
2. Click "Save and deploy"

## Step 5: Add AI Capabilities

After the initial deployment:

1. Go to the "Backend environments" tab
2. Click "Add backend environment"
3. Name it "dev" or "prod"
4. In the backend environment:
   - Go to "AI/ML" section
   - Click "Add AI/ML capabilities"
   - Select "Generative AI" and "Conversational AI"
   - Configure the AI models as needed

## Step 6: Update Your Frontend

After deployment, update your frontend configuration with the actual values:

1. Go to "Environment variables" in the Amplify Console
2. Add the necessary environment variables for your Amplify configuration
3. Redeploy your application

Your application is now deployed with Amplify AI capabilities!