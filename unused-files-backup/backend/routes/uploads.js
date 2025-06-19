const express = require('express');
const router = express.Router();
const { uploadFile, uploadMultiple } = require('../controllers/uploadController');
const { protect } = require('../middleware/auth');

// Protected routes
router.post('/', protect, uploadFile);
router.post('/multiple', protect, uploadMultiple);

module.exports = router;