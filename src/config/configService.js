import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = {
  // Server configuration
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Security
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '15m',
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  
  // Rate limiting
  RATE_LIMIT_WINDOW: process.env.RATE_LIMIT_WINDOW || '15 minutes',
  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX || 100,
  
  // ML Service
  AI_API_URL: process.env.AI_API_URL || 'http://localhost:5000',
  ML_CACHE_TTL: process.env.ML_CACHE_TTL || 3600, // 1 hour in seconds
  
  // Database
  MONGODB_URI: process.env.MONGODB_URI,
  
  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
};

// Validate required environment variables
const requiredEnvVars = ['JWT_SECRET', 'MONGODB_URI'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
}

export default config;
