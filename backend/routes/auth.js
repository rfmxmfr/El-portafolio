const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { users: mockUsers } = require('../mockData');
const { createCookie } = require('../utils/cookie');
const { generateTokens } = require('../auth/authService');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user exists in mock data
    const userExists = mockUsers.find(u => u.email === email || u.username === username);
    
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const newUser = {
      _id: `user-${Date.now()}`,
      username,
      email,
      password: hashedPassword,
      role: 'user'
    };
    
    mockUsers.push(newUser);
    
    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(newUser._id);
    
    // Set HttpOnly cookie for refresh token
    res.setHeader('Set-Cookie', createCookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    }));
    
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      token: accessToken
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find user in mock data
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Set HttpOnly cookie for refresh token
    res.setHeader('Set-Cookie', createCookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    }));

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: accessToken
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const mockUser = mockUsers.find(u => u._id === req.user.id);
    
    if (!mockUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      _id: mockUser._id,
      username: mockUser.username,
      email: mockUser.email,
      role: mockUser.role
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error getting user data' });
  }
});

// @desc    Refresh token
// @route   POST /api/auth/refresh
// @access  Public
router.post('/refresh', async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    
    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token provided' });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET || 'secret');
    
    // Generate new access token
    const tokens = generateTokens(decoded.id);
    
    res.json({ token: tokens.accessToken });
  } catch (error) {
    console.error('Refresh token error:', error);
    if (error.name === 'TokenExpiredError') {
      res.clearCookie('refresh_token');
      return res.status(401).json({ message: 'Refresh token expired' });
    }
    res.status(401).json({ message: 'Invalid refresh token' });
  }
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
router.post('/logout', (req, res) => {
  try {
    res.clearCookie('refresh_token');
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Error during logout' });
  }
});

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    let user;
    
    try {
      // Try database operations
      user = await User.findById(req.user._id).select('-password');
    } catch (dbError) {
      // Mock profile
      console.log('Using mock user profile');
      user = { ...mockUsers.find(u => u._id === req.user._id) };
      delete user.password;
    }
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;