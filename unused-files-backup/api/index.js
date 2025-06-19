// Serverless API for Vercel
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { collections, designs, tags, features, about, users } = require('../backend/mockData');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Generate JWT token
const JWT_SECRET = process.env.JWT_SECRET || 'changeme-in-production';

const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    console.warn('Warning: JWT_SECRET environment variable is not set. Using default insecure secret.');
  }
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Auth middleware
const auth = (req, res, next) => {
  try {
    let token;
    
    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Find user
    const user = users.find(u => u._id === decoded.id);
    
    // Special case for demo login
    if (!user && decoded.id === 'demo-admin-id') {
      req.user = users.find(u => u.username === 'rmonteiro');
    } else {
      req.user = user;
    }
    
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Fashion Portfolio API is running');
});

// Login route
app.post('/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    
    // Special case for rmonteiro/Junkie88
    if (email === 'rmonteiro' && password === 'Junkie88') {
      const user = users.find(u => u.username === 'rmonteiro');
      const token = generateToken('demo-admin-id');
      
      return res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: token
      });
    }
    
    // Find user
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Compare password
    const isMatch = bcrypt.compareSync(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all collections
app.get('/collections', (req, res) => {
  res.json(collections);
});

// Get collection by ID
app.get('/collections/:id', (req, res) => {
  const collection = collections.find(c => c.id === req.params.id);
  
  if (!collection) {
    return res.status(404).json({ message: 'Collection not found' });
  }
  
  res.json(collection);
});

// Create collection
app.post('/collections', auth, (req, res) => {
  const { title, description, tags, images, moodBoardUrl, sketchUrl } = req.body;
  
  const newCollection = {
    id: `collection-${Date.now()}`,
    title,
    description,
    tags,
    images: images || [],
    moodBoardUrl,
    sketchUrl,
    status: 'draft',
    lastUpdated: new Date().toISOString().split('T')[0],
    items: 0,
    createdAt: new Date()
  };
  
  collections.push(newCollection);
  res.status(201).json(newCollection);
});

// Get all designs
app.get('/designs', (req, res) => {
  res.json(designs);
});

// Get design by ID
app.get('/designs/:id', (req, res) => {
  const design = designs.find(d => d.id === req.params.id);
  
  if (!design) {
    return res.status(404).json({ message: 'Design not found' });
  }
  
  res.json(design);
});

// Get all tags
app.get('/tags', (req, res) => {
  res.json(tags);
});

// Get all features
app.get('/features', (req, res) => {
  res.json(features);
});

// Get about content
app.get('/about', (req, res) => {
  res.json(about);
});

// ML API routes
app.post('/ml/generate-ideas', (req, res) => {
  const { prompt } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }
  
  // Generate ideas based on prompt
  const ideas = [
    "A sustainable collection featuring recycled materials with clean, minimalist lines",
    "Versatile pieces that transition seamlessly from day to evening wear",
    "Focus on natural dyes and locally-sourced fabrics for minimal environmental impact",
    "Incorporate adjustable design elements to extend the garment lifecycle"
  ];
  
  res.json({
    ideas,
    timestamp: new Date().toISOString(),
    model: 'fashion-gen'
  });
});

app.post('/ml/generate-image', (req, res) => {
  const { prompt } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }
  
  res.json({
    image_url: 'https://placehold.co/600x800/png?text=AI+Generated+Fashion+Design',
    prompt,
    timestamp: new Date().toISOString(),
    model: 'image-gen'
  });
});

app.get('/ml/model-status', (req, res) => {
  res.json({
    models: {
      'fashion-gen': {
        'status': 'active',
        'type': 'text',
        'description': 'Generates fashion design ideas and descriptions'
      },
      'style-analyzer': {
        'status': 'active',
        'type': 'text',
        'description': 'Analyzes fashion styles from text descriptions'
      },
      'image-gen': {
        'status': 'active',
        'type': 'image',
        'description': 'Generates fashion design images from descriptions'
      }
    },
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Export for Vercel serverless function
module.exports = app;