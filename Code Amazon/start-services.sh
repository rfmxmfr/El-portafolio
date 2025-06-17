#!/bin/bash

echo "Starting services for El-portafolio..."

# Start MongoDB database
echo "Starting MongoDB database..."
if command -v mongod &> /dev/null; then
    mongod --dbpath ./data/db --fork --logpath ./data/mongod.log
    echo "MongoDB started successfully"
else
    echo "MongoDB not found. Please install MongoDB or use Docker."
fi

# Start Django ML backend
echo "Starting Django ML backend..."
cd django_backend
if command -v docker-compose &> /dev/null; then
    docker-compose up -d
    echo "Django ML backend started successfully"
else
    echo "Docker Compose not found. Starting Django directly..."
    python manage.py runserver 8000 &
fi
cd ..

# Start Node.js backend
echo "Starting Node.js backend..."
cd backend
npm start &
cd ..

echo "All services started successfully!"
echo "- MongoDB database is running"
echo "- Django ML backend is available at http://localhost:8000"
echo "- Node.js backend is available at http://localhost:5000"
echo ""
echo "You can now start the frontend with 'npm run dev'"