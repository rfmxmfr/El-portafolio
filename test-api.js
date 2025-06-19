// Simple test script for API endpoints
const app = require('./api/index.js');
const http = require('http');

// Create a test server
const server = http.createServer(app);
const PORT = 3000;

// Start the server
server.listen(PORT, () => {
  console.log(`Test server running at http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET  /');
  console.log('  POST /auth/login');
  console.log('  GET  /collections');
  console.log('  GET  /collections/:id');
  console.log('  POST /collections');
  console.log('  GET  /designs');
  console.log('  GET  /designs/:id');
  console.log('  GET  /tags');
  console.log('  GET  /features');
  console.log('  GET  /about');
  console.log('  POST /ml/generate-ideas');
  console.log('  POST /ml/generate-image');
  console.log('  GET  /ml/model-status');
  console.log('  GET  /health');
  console.log('\nPress Ctrl+C to stop the server');
});

// Handle server shutdown
process.on('SIGINT', () => {
  console.log('Shutting down test server');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});