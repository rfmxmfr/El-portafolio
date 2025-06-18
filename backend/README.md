# Fashion Portfolio Backend API

This is the backend API for the Fashion Portfolio application. It provides endpoints for managing collections, designs, tags, features, and more.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/fashion_portfolio
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

3. Seed the database with initial data:
   ```
   npm run seed
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile (protected)

### Collections
- `GET /api/collections` - Get all collections
- `GET /api/collections/:id` - Get single collection
- `POST /api/collections` - Create a collection (protected)
- `PUT /api/collections/:id` - Update a collection (protected)
- `DELETE /api/collections/:id` - Delete a collection (protected)
- `PUT /api/collections/:id/publish` - Publish a collection (protected)
- `PUT /api/collections/:id/unpublish` - Unpublish a collection (protected)

### Designs
- `GET /api/designs` - Get all designs
- `GET /api/designs/:id` - Get single design
- `POST /api/designs` - Create a design (protected)
- `PUT /api/designs/:id` - Update a design (protected)
- `DELETE /api/designs/:id` - Delete a design (protected)

### Tags
- `GET /api/tags` - Get all tags
- `POST /api/tags` - Create a tag (protected)
- `PUT /api/tags/:id` - Update a tag (protected)
- `DELETE /api/tags/:id` - Delete a tag (protected)

### Features
- `GET /api/features` - Get all features
- `POST /api/features` - Create a feature (protected)
- `PUT /api/features/:id` - Update a feature (protected)
- `DELETE /api/features/:id` - Delete a feature (protected)

### About
- `GET /api/about` - Get about content
- `PUT /api/about` - Update about content (protected)

### Uploads
- `POST /api/uploads` - Upload a file (protected)
- `POST /api/uploads/multiple` - Upload multiple files (protected)

## Authentication

Protected routes require a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Default Admin User

After running the seed script, you can login with:
- Email: admin@example.com
- Password: password123