# API Documentation

## Authentication Endpoints

### POST /api/auth/login
Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "token": "jwt-token-here",
  "user": {
    "_id": "user-id",
    "username": "username",
    "email": "user@example.com",
    "role": "admin"
  }
}
```

**Error Responses:**
- 400 Bad Request: Invalid credentials
- 401 Unauthorized: Authentication failed
- 429 Too Many Requests: Rate limit exceeded

### POST /api/auth/logout
Logs out the current user.

**Headers:**
- Authorization: Bearer {token}

**Response (200 OK):**
```json
{
  "message": "Logged out successfully"
}
```

## Collection Endpoints

### GET /api/collections
Returns a list of all collections.

**Headers:**
- Authorization: Bearer {token}

**Response (200 OK):**
```json
[
  {
    "_id": "collection-id",
    "name": "Collection Name",
    "description": "Collection description",
    "tags": ["tag1", "tag2"],
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
]
```

### GET /api/collections/:id
Returns a specific collection by ID.

**Headers:**
- Authorization: Bearer {token}

**Response (200 OK):**
```json
{
  "_id": "collection-id",
  "name": "Collection Name",
  "description": "Collection description",
  "tags": ["tag1", "tag2"],
  "designs": [
    {
      "_id": "design-id",
      "title": "Design Title",
      "description": "Design description"
    }
  ],
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- 404 Not Found: Collection not found

### POST /api/collections
Creates a new collection.

**Headers:**
- Authorization: Bearer {token}

**Request Body:**
```json
{
  "name": "New Collection",
  "description": "Collection description",
  "tags": ["tag1", "tag2"]
}
```

**Response (201 Created):**
```json
{
  "_id": "new-collection-id",
  "name": "New Collection",
  "description": "Collection description",
  "tags": ["tag1", "tag2"],
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

### PUT /api/collections/:id
Updates an existing collection.

**Headers:**
- Authorization: Bearer {token}

**Request Body:**
```json
{
  "name": "Updated Collection",
  "description": "Updated description",
  "tags": ["tag1", "tag2", "tag3"]
}
```

**Response (200 OK):**
```json
{
  "_id": "collection-id",
  "name": "Updated Collection",
  "description": "Updated description",
  "tags": ["tag1", "tag2", "tag3"],
  "updatedAt": "2023-01-02T00:00:00.000Z"
}
```

### DELETE /api/collections/:id
Deletes a collection.

**Headers:**
- Authorization: Bearer {token}

**Response (200 OK):**
```json
{
  "message": "Collection deleted successfully"
}
```

## Design Endpoints

### GET /api/designs
Returns a list of all designs.

**Headers:**
- Authorization: Bearer {token}

**Response (200 OK):**
```json
[
  {
    "_id": "design-id",
    "title": "Design Title",
    "description": "Design description",
    "images": ["url1", "url2"],
    "collection": "collection-id",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
]
```

### GET /api/designs/:id
Returns a specific design by ID.

**Headers:**
- Authorization: Bearer {token}

**Response (200 OK):**
```json
{
  "_id": "design-id",
  "title": "Design Title",
  "description": "Design description",
  "images": ["url1", "url2"],
  "collection": {
    "_id": "collection-id",
    "name": "Collection Name"
  },
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

### POST /api/designs
Creates a new design.

**Headers:**
- Authorization: Bearer {token}
- Content-Type: multipart/form-data

**Request Body:**
```
title: "New Design"
description: "Design description"
collection: "collection-id"
images: [File1, File2]
```

**Response (201 Created):**
```json
{
  "_id": "new-design-id",
  "title": "New Design",
  "description": "Design description",
  "images": ["url1", "url2"],
  "collection": "collection-id",
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

### PUT /api/designs/:id
Updates an existing design.

**Headers:**
- Authorization: Bearer {token}
- Content-Type: multipart/form-data

**Request Body:**
```
title: "Updated Design"
description: "Updated description"
collection: "collection-id"
images: [File1, File2]
```

**Response (200 OK):**
```json
{
  "_id": "design-id",
  "title": "Updated Design",
  "description": "Updated description",
  "images": ["url1", "url2", "url3"],
  "collection": "collection-id",
  "updatedAt": "2023-01-02T00:00:00.000Z"
}
```

### DELETE /api/designs/:id
Deletes a design.

**Headers:**
- Authorization: Bearer {token}

**Response (200 OK):**
```json
{
  "message": "Design deleted successfully"
}
```

## Error Handling

All API endpoints follow a consistent error response format:

```json
{
  "message": "Error message describing what went wrong"
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Too Many Requests
- 500: Server Error