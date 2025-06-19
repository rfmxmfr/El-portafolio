const express = require('express');
const router = express.Router();
const { 
  getDesigns, 
  getDesignById, 
  createDesign, 
  updateDesign, 
  deleteDesign 
} = require('../controllers/designController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getDesigns);
router.get('/:id', getDesignById);

// Protected routes
router.post('/', protect, createDesign);
router.put('/:id', protect, updateDesign);
router.delete('/:id', protect, deleteDesign);

module.exports = router;