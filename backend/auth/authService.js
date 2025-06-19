const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createCookie } = require('../utils/cookie');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '24h';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  const refreshToken = jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
  );

  return { accessToken, refreshToken };
};

const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

const createAuthCookie = (token) => {
  return createCookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });
};

module.exports = {
  generateTokens,
  hashPassword,
  comparePassword,
  verifyToken,
  createAuthCookie,
};
