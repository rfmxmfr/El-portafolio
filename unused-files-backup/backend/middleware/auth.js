const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { users: mockUsers } = require('../mockData');

module.exports = async (req, res, next) => {
  try {
    let token;
    
    // Get token from header only (more secure than cookies)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
    
    // Verify token with proper secret
    let decoded;
    try {
      // Ensure JWT_SECRET is set in production
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret && process.env.NODE_ENV === 'production') {
        console.error('JWT_SECRET not set in production environment');
        return res.status(500).json({ message: 'Server configuration error' });
      }
      
      decoded = jwt.verify(token, jwtSecret || 'dev_secret_only_for_development');
      
      // Check token expiration explicitly
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        return res.status(401).json({ message: 'Token expired' });
      }
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }

    // Get user from database
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};