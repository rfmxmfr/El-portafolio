const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Import routes
const authRoutes = require('../backend/routes/auth');
const collectionRoutes = require('../backend/routes/collections');
const designRoutes = require('../backend/routes/designs');
const uploadRoutes = require('../backend/routes/uploads');
const aboutRoutes = require('../backend/routes/about');
const tagRoutes = require('../backend/routes/tags');
const featureRoutes = require('../backend/routes/features');

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/designs', designRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/features', featureRoutes);

// Basic route for testing
app.get('/api', (req, res) => {
  res.send('Fashion Portfolio API is running');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Export the Express API
module.exports = app;