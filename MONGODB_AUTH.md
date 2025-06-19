# MongoDB Authentication Setup

This guide explains how to set up MongoDB authentication for El-portafolio.

## Prerequisites

1. MongoDB installed and running
2. Node.js and npm installed

## Setup Steps

### 1. Configure MongoDB Connection

Create or update your `.env` file in the project root with your MongoDB connection string:

```
MONGODB_URI=mongodb://localhost:27017/fashion-portfolio
JWT_SECRET=your_secure_jwt_secret
```

For production, use a secure MongoDB Atlas connection string:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/fashion-portfolio?retryWrites=true&w=majority
```

### 2. Create Admin User

Run the provided script to create an admin user:

```bash
cd backend
node scripts/create-admin.js
```

This will create an admin user with the following credentials:
- Username: admin
- Email: admin@example.com
- Password: Admin123!

You should change this password after first login.

### 3. Start the Application

Start the application with MongoDB authentication:

```bash
./start-all.sh
```

## User Management

### Adding New Users

You can add new users through the registration API endpoint:

```
POST /api/auth/register
{
  "username": "newuser",
  "email": "user@example.com",
  "password": "securepassword"
}
```

### User Roles

The system supports two roles:
- `admin`: Full access to all features
- `editor`: Limited access to content management

## Security Notes

1. Always use HTTPS in production
2. Set a strong JWT_SECRET in your environment variables
3. Change the default admin password immediately after setup
4. Consider implementing rate limiting for login attempts