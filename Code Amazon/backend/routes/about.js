const express = require('express');
const router = express.Router();
const { getAbout, updateAbout } = require('../controllers/aboutController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getAbout);

// Protected routes
router.put('/', protect, updateAbout);

module.exports = router;