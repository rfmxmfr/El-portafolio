const express = require('express');
const router = express.Router();
const { getTags, createTag, updateTag, deleteTag } = require('../controllers/tagController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getTags);

// Protected routes
router.post('/', protect, createTag);
router.put('/:id', protect, updateTag);
router.delete('/:id', protect, deleteTag);

module.exports = router;