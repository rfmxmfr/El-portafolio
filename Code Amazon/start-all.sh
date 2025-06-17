#!/bin/bash

echo "Starting El-portafolio (complete stack)..."

# Start backend services in memory-only mode
echo "Starting backend services..."
./start-minimal.sh &
BACKEND_PID=$!

# Wait for backends to initialize
echo "Waiting for backend services to initialize..."
sleep 5

# Start frontend
echo "Starting frontend..."
./start-frontend.sh

# Cleanup when frontend exits
trap "kill $BACKEND_PID; exit" INT TERM EXIT