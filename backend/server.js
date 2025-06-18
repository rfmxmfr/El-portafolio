const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const collectionRoutes = require('./routes/collections');
const designRoutes = require('./routes/designs');
const uploadRoutes = require('./routes/uploads');
const aboutRoutes = require('./routes/about');
const tagRoutes = require('./routes/tags');
const featureRoutes = require('./routes/features');

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/designs', designRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/features', featureRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Fashion Portfolio API is running');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});