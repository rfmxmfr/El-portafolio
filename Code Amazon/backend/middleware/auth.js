const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { users: mockUsers } = require('../mockData');

module.exports = async (req, res, next) => {
  try {
    let token;
    
    // Get token from header or cookie
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
    
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      
      try {
        // Try to get user from database
        req.user = await User.findById(decoded.id).select('-password');
      } catch (dbError) {
        // If database error, use mock data
        console.log('Using mock user authentication');
        req.user = mockUsers.find(u => u._id === decoded.id);
        
        // Special case for demo login
        if (!req.user && decoded.id === 'demo-admin-id') {
          req.user = mockUsers.find(u => u.username === 'rmonteiro');
        }
      }
      
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, invalid token' });
      }
      
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};