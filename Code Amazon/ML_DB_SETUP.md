# Database and ML Services Setup

This guide explains how to set up and run the database and ML services for El-portafolio.

## Quick Start

Use the provided script to start all services:

```bash
./start-services.sh
```

This script will:
1. Start MongoDB database
2. Start Django ML backend
3. Start Node.js backend

## Manual Setup

### 1. MongoDB Database

```bash
# Create data directory if it doesn't exist
mkdir -p data/db

# Start MongoDB
mongod --dbpath ./data/db --fork --logpath ./data/mongod.log
```

### 2. Django ML Backend

```bash
cd django_backend

# Using Docker
docker-compose up -d

# OR without Docker
python manage.py runserver 8000
```

### 3. Node.js Backend

```bash
cd backend
npm start
```

## Verifying Services

- MongoDB: Connect using `mongo` command
- Django ML API: Visit http://localhost:8000/api/health
- Node.js API: Visit http://localhost:5000/api

## Service Status

The admin dashboard includes a status indicator for ML services. If the ML service is unavailable, the application will fall back to using mock data.

## Troubleshooting

### MongoDB Issues
- Ensure MongoDB is installed: `mongod --version`
- Check if MongoDB is running: `ps aux | grep mongod`
- Verify data directory permissions: `chmod 777 data/db`

### Django ML Service Issues
- Check Docker status: `docker ps`
- View logs: `docker-compose logs`
- Verify Python environment: `python --version`

### Node.js Backend Issues
- Check Node.js version: `node --version`
- Verify dependencies: `npm install`
- Check logs: `npm start`