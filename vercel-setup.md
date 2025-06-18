# Vercel Deployment Guide

Follow these steps to deploy your Fashion Portfolio to Vercel:

## 1. Install Vercel CLI and Login

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login
```

## 2. Set up MongoDB Atlas

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas/register
2. Create a new cluster (free tier is sufficient)
3. Set up a database user with read/write permissions
4. Configure network access to allow connections from anywhere (0.0.0.0/0)
5. Get your connection string: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority`

## 3. Configure Environment Variables

Create a `.env` file in your project root with:

```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
FRONTEND_URL=your_vercel_app_url (after first deployment)
NODE_ENV=production
```

## 4. Initial Deployment

```bash
# Run the deployment script
./deploy-vercel.sh
```

## 5. Update Environment Variables

After the first deployment, get your Vercel app URL and update:

```bash
# Add environment variables to Vercel
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add FRONTEND_URL
vercel env add NODE_ENV
```

## 6. Redeploy

```bash
# Redeploy with updated environment variables
./deploy-vercel.sh
```

## Troubleshooting

- If you encounter CORS issues, ensure the `FRONTEND_URL` is correctly set
- For database connection issues, check your MongoDB Atlas network access settings
- For serverless function timeouts, consider optimizing your database queries