const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoints
app.post('/api/templates', (req, res) => {
  // Handle template creation
  const { template } = req.body;
  // In a real app, this would save to a database
  res.json({ success: true, template });
});

app.delete('/api/templates/:id', (req, res) => {
  // Handle template deletion
  const { id } = req.params;
  // In a real app, this would delete from database
  res.json({ success: true, id });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
