const express = require('express');
const router = express.Router();
const { getFeatures, createFeature, updateFeature, deleteFeature } = require('../controllers/featureController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getFeatures);

// Protected routes
router.post('/', protect, createFeature);
router.put('/:id', protect, updateFeature);
router.delete('/:id', protect, deleteFeature);

module.exports = router;