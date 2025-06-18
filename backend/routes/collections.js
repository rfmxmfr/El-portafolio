const express = require('express');
const router = express.Router();
const { 
  getCollections, 
  getCollectionById, 
  createCollection, 
  updateCollection, 
  deleteCollection,
  publishCollection,
  unpublishCollection
} = require('../controllers/collectionController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getCollections);
router.get('/:id', getCollectionById);

// Protected routes
router.post('/', protect, createCollection);
router.put('/:id', protect, updateCollection);
router.delete('/:id', protect, deleteCollection);
router.put('/:id/publish', protect, publishCollection);
router.put('/:id/unpublish', protect, unpublishCollection);

module.exports = router;