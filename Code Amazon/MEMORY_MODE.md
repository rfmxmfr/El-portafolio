# Running El-portafolio in Memory-Only Mode

This guide explains how to run the application without requiring MongoDB.

## Quick Start

Use the provided script to start all services in memory-only mode:

```bash
./start-minimal.sh
```

This script will:
1. Start Node.js backend in memory-only mode
2. Start Django ML backend

## What Works in Memory-Only Mode

### Backend Features
- Authentication (login with rmonteiro/Junkie88)
- Collections management (create, read, update, delete)
- Design management
- ML services (with fallback to mock data)

### Frontend Features
- Admin dashboard
- AI & ML tools
- Collection management
- Design board

## Limitations

When running in memory-only mode:

1. **Data Persistence**: Changes will not be saved between server restarts
2. **Limited Data**: Only mock data will be available
3. **File Uploads**: May not work properly without proper storage

## How It Works

The application has been modified to:

1. Continue running even if MongoDB connection fails
2. Use mock data for all database operations
3. Provide realistic responses for API calls
4. Maintain all functionality with in-memory data

## Troubleshooting

If you encounter issues:

1. Check that both backend services are running:
   ```
   ps aux | grep node
   ps aux | grep python
   ```

2. Verify the services are accessible:
   - Node.js backend: http://localhost:5000
   - Django ML backend: http://localhost:8000/api/health

3. If services crash, restart them:
   ```
   ./start-minimal.sh
   ```

## Returning to Database Mode

To use the application with a real database:

1. Install and start MongoDB
2. Create the data directory:
   ```
   mkdir -p data/db
   ```
3. Start MongoDB:
   ```
   mongod --dbpath ./data/db
   ```
4. Start the application with the full services script:
   ```
   ./start-services.sh
   ```