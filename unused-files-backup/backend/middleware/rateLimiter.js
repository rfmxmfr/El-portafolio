import rateLimit from 'express-rate-limit';
import config from '../config/configService.js';

const apiLimiter = rateLimit({
  windowMs: parseInt(config.RATE_LIMIT_WINDOW),
  max: parseInt(config.RATE_LIMIT_MAX),
  message: {
    error: 'Too many requests from this IP, please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Custom rate limiter for ML endpoints
const mlLimiter = rateLimit({
  windowMs: parseInt(config.RATE_LIMIT_WINDOW),
  max: parseInt(config.RATE_LIMIT_MAX) / 2, // More restrictive for ML endpoints
  message: {
    error: 'Too many ML requests from this IP, please try again later.',
    code: 'ML_RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export { apiLimiter, mlLimiter };
