# El-portafolio

A fashion portfolio application with AI and ML features.

## Features

- Fashion portfolio showcase
- Admin dashboard for content management
- AI-powered design idea generation
- ML-based image generation
- Collection and design management
- Responsive design

## Deployment

### Deploy to Vercel

To deploy the application to Vercel as a new app:

```bash
./deploy-vercel-new.sh
```

This script will:
1. Install the Vercel CLI if needed
2. Log you in to Vercel
3. Deploy the application as a new project

### Login Credentials

After deployment, you can log in with:
- Username: rmonteiro
- Password: Junkie88

## Local Development

### Start Everything

To start both backend and frontend:

```bash
./start-all.sh
```

### Start Services Separately

Start backend services:
```bash
./start-minimal.sh
```

Start frontend:
```bash
./start-frontend.sh
```

## Project Structure

- `/src` - Frontend React application
- `/api` - Serverless API for Vercel deployment
- `/backend` - Node.js backend (for local development)
- `/django_backend` - Django ML backend (for local development)

## Technologies

- React
- Vite
- Express.js
- Tailwind CSS
- Vercel Serverless Functions