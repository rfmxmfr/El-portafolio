# Deploying to Vercel with MongoDB Atlas

This guide explains how to deploy the Fashion Portfolio application to Vercel with MongoDB Atlas.

## Prerequisites

1. Create a [Vercel account](https://vercel.com/signup)
2. Create a [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register)

## MongoDB Atlas Setup

1. Create a new cluster (free tier is sufficient)
2. Set up a database user with read/write permissions
3. Configure network access (IP whitelist) to allow connections from anywhere (0.0.0.0/0)
4. Get your connection string: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority`

## Vercel Setup

1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Login to Vercel:
   ```
   vercel login
   ```

3. Create a `.env` file with your environment variables:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secure_jwt_secret
   FRONTEND_URL=your_vercel_app_url (after first deployment)
   NODE_ENV=production
   ```

4. Add these environment variables to Vercel:
   ```
   vercel env add MONGODB_URI
   vercel env add JWT_SECRET
   vercel env add FRONTEND_URL
   vercel env add NODE_ENV
   ```

## Deployment

Run the deployment script:
```
npm run deploy:vercel
```

Or manually:
```
npm run build
vercel --prod
```

## After Deployment

1. Get your Vercel app URL from the deployment output
2. Update the `FRONTEND_URL` environment variable in Vercel with this URL
3. Redeploy if necessary

## Troubleshooting

- If you encounter CORS issues, ensure the `FRONTEND_URL` is correctly set
- For database connection issues, check your MongoDB Atlas network access settings
- For serverless function timeouts, consider optimizing your database queries