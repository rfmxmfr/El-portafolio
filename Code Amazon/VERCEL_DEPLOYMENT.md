# Deploying to Vercel

This guide explains how to deploy the Fashion Portfolio application to Vercel, including the new AI and ML features.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Vercel CLI installed (`npm install -g vercel`)
3. MongoDB Atlas database (for backend data)

## Deployment Steps

### 1. Set Up Environment Variables

Run the environment setup script:

```bash
./setup-vercel-env.sh
```

You'll be prompted to enter values for:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secret key for JWT authentication
- `FRONTEND_URL`: Your Vercel deployment URL (you can update this later)
- `NODE_ENV`: Set to "production"

### 2. Deploy the Application

Run the deployment script:

```bash
./deploy-vercel-ai.sh
```

This script will:
1. Commit your changes
2. Build the application
3. Deploy to Vercel

### 3. Verify Deployment

Once deployment is complete, Vercel will provide a URL for your application. Visit this URL to verify that your application is working correctly.

### 4. Access the Admin Dashboard

To access the admin dashboard with the new AI features:

1. Navigate to `/admin` on your Vercel deployment
2. Log in with the following credentials:
   - Email: admin@example.com
   - Password: password123

## Troubleshooting

If you encounter issues with the deployment:

1. Check the Vercel deployment logs in the Vercel dashboard
2. Ensure all environment variables are set correctly
3. Verify that your MongoDB database is accessible from Vercel

## Updating the Deployment

To update your deployment after making changes:

```bash
./deploy-vercel-ai.sh
```

This will commit your changes and redeploy the application.