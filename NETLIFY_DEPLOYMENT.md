# Deploying to Netlify

This guide provides instructions for deploying the El-portafolio React application to Netlify.

## Option 1: Manual Deployment via Netlify UI

1. **Build your project locally**:
   ```bash
   npm install
   npm run build
   ```
   This will create a `dist` folder with your built application.

2. **Deploy to Netlify**:
   - Go to [Netlify](https://app.netlify.com/) and log in or sign up
   - Click on "Add new site" > "Deploy manually"
   - Drag and drop your `dist` folder to the designated area
   - Wait for the upload and deployment to complete
   - Your site will be live at a Netlify subdomain (e.g., `your-site-name.netlify.app`)

## Option 2: Continuous Deployment with GitHub

1. **Connect your GitHub repository**:
   - Go to [Netlify](https://app.netlify.com/) and log in
   - Click "New site from Git" > "GitHub"
   - Select your repository

2. **Configure build settings**:
   - Build command: `npm install i18next@^23.10.0 react-i18next@^14.0.5 && npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

3. **Environment variables** (if needed):
   - Go to Site settings > Build & deploy > Environment
   - Add any required environment variables

## Option 3: Using GitHub Actions (Already Set Up)

Your repository already has a GitHub Actions workflow for Netlify deployment. To use it:

1. **Set up Netlify secrets**:
   - Get your Netlify Auth Token from Netlify user settings
   - Get your Site ID from the Netlify site settings
   - Add these as secrets in your GitHub repository:
     - `NETLIFY_AUTH_TOKEN`
     - `NETLIFY_SITE_ID`

2. **Push to main branch**:
   - The workflow will automatically deploy when you push to the main branch

## Troubleshooting

### Routing Issues
The application uses React Router, so client-side routing is handled by the `_redirects` file in the `public` directory, which contains:
```
/*    /index.html   200
```

This ensures that all routes are directed to index.html, allowing React Router to handle them.

### Build Issues
If you encounter build issues:
- Check that all dependencies are installed
- Verify that the Node.js version is compatible (project uses Node 18)
- Review build logs for specific errors

## Security Note

The current Login.jsx file contains hardcoded credentials. Before deploying to production:

1. Remove hardcoded credentials from Login.jsx
2. Implement proper authentication
3. Secure any sensitive routes and data

## Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [React Router on Netlify](https://docs.netlify.com/routing/redirects/rewrites-proxies/#history-pushstate-and-single-page-apps)