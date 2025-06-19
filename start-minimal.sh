#!/bin/bash

echo "Starting minimal services for El-portafolio..."

# Start Node.js backend
echo "Starting Node.js backend..."
cd backend
npm start &
NODE_PID=$!
cd ..

# Start Django ML backend
echo "Starting Django ML backend..."
cd django_backend
python manage.py runserver 8000 &
DJANGO_PID=$!
cd ..

echo "Services started in memory-only mode (no database persistence)"
echo "- Node.js backend is available at http://localhost:5000"
echo "- Django ML backend is available at http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user to press Ctrl+C
trap "kill $NODE_PID $DJANGO_PID; exit" INT
wait