# El Portafolio User Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Features Overview](#features-overview)
4. [Using the Admin Dashboard](#using-the-admin-dashboard)
5. [Design Tools](#design-tools)
6. [Authentication](#authentication)
7. [Internationalization](#internationalization)
8. [Technical Requirements](#technical-requirements)
9. [Troubleshooting](#troubleshooting)

## Introduction
El Portafolio is a modern portfolio management application built with React, featuring advanced design tools, AI-powered capabilities, and a comprehensive admin dashboard. This application is designed to help fashion designers and creatives manage their collections, generate design ideas, and showcase their work professionally.

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation
1. Clone the repository:
```bash
git clone https://github.com/rfmxmfr/El-portafolio.git
```

2. Install dependencies:
```bash
cd El-portafolio
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Access the application at `http://localhost:5173`

## Features Overview

### 1. Admin Dashboard
- Collection Management
  - Create and manage design collections
  - Upload mood boards and sketches
  - Add descriptive metadata
  - Tag-based organization

### 2. Design Tools
- Color Palette Generator
  - AI-powered color suggestions
  - Custom palette creation
  - Palette visualization
- Typography Tools
  - Font pairing suggestions
  - Typography hierarchy
  - Responsive text sizing
- Layout Designer
  - Grid-based layout creation
  - Responsive design preview
  - Export functionality

### 3. Authentication
- Secure login system
- Role-based access control
- API key authentication (7-day expiration)
- Session management

## Using the Admin Dashboard

### Accessing the Admin Panel
1. Navigate to the login page
2. Enter your credentials:
   - Email: admin@example.com
   - Password: admin123 (default credentials)
3. Click "Login"

### Managing Collections
1. Create New Collection:
   - Click "New Collection"
   - Fill in title and description
   - Upload mood board and sketches
   - Add relevant tags
   - Click "Save"

2. View Collections:
   - Browse existing collections
   - Filter by tags
   - View collection details
   - Edit or delete collections

## Design Tools

### Color Palette Generator
1. Enter a base color or theme
2. Click "Generate Palette"
3. View generated color combinations
4. Copy or export colors

### Typography Tools
1. Select font families
2. Adjust text sizes
3. Preview typography hierarchy
4. Export typographic styles

## Authentication

### Login Process
1. Enter your email and password
2. Click "Login"
3. After successful authentication:
   - Token is stored in localStorage
   - Redirected to dashboard
   - Automatic session management

### Security Features
- Token-based authentication
- Secure API endpoints
- Rate limiting
- Session timeout

## Internationalization
The application supports multiple languages through i18n integration. Currently supported languages include:
- English (default)
- Additional languages can be added through translation files

## Technical Requirements

### Frontend
- React 18+
- Vite build system
- Tailwind CSS for styling
- Radix UI components
- Framer Motion for animations
- Axios for API calls

### Backend
- Node.js backend
- Express.js server
- API key authentication
- MongoDB database

## Troubleshooting

### Common Issues
1. **Build Errors**
   - Ensure all dependencies are installed
   - Clear npm cache if needed
   - Check for conflicting package versions

2. **Authentication Issues**
   - Clear localStorage and try again
   - Verify API key validity
   - Check network connection

3. **Performance Issues**
   - Clear browser cache
   - Update to latest browser version
   - Check for memory leaks

### Support
For technical support or feature requests, please contact:
- Email: support@elportafolio.com
- GitHub Issues: https://github.com/rfmxmfr/El-portafolio/issues

## Best Practices

### Security
- Change default admin credentials immediately
- Use strong passwords
- Regularly update dependencies
- Keep backup of important data

### Performance
- Optimize image uploads
- Use appropriate compression
- Implement lazy loading
- Monitor API usage

## Updates and Maintenance

### Regular Maintenance
- Update dependencies regularly
- Backup data frequently
- Monitor application logs
- Keep system up to date

### Version Control
- Use git for version control
- Maintain clear commit history
- Document changes in changelog

This guide provides a comprehensive overview of El Portafolio's features and usage. For more detailed information about specific features or technical aspects, please refer to the documentation or contact support.
