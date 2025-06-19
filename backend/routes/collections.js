const express = require('express');
const router = express.Router();
const Collection = require('../models/Collection');
const auth = require('../middleware/auth');
const { collections: mockCollections } = require('../mockData');

// Get all collections
router.get('/', async (req, res) => {
  try {
    let collections;
    
    try {
      // Try to get from database
      collections = await Collection.find().sort({ createdAt: -1 });
    } catch (dbError) {
      // If database error, use mock data
      console.log('Using mock collections data');
      collections = mockCollections;
    }
    
    res.json(collections);
  } catch (error) {
    console.error('Error fetching collections:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get collection by ID
router.get('/:id', async (req, res) => {
  try {
    let collection;
    
    try {
      // Try to get from database
      collection = await Collection.findById(req.params.id);
    } catch (dbError) {
      // If database error, use mock data
      console.log('Using mock collection data');
      collection = mockCollections.find(c => c.id === req.params.id);
    }
    
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    
    res.json(collection);
  } catch (error) {
    console.error('Error fetching collection:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create collection (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, tags, images, moodBoardUrl, sketchUrl } = req.body;
    
    try {
      // Try to create in database
      const newCollection = new Collection({
        title,
        description,
        tags,
        images,
        moodBoardUrl,
        sketchUrl,
        createdBy: req.user._id
      });
      
      await newCollection.save();
      res.status(201).json(newCollection);
    } catch (dbError) {
      // If database error, return mock response
      console.log('Using mock collection creation');
      const newCollection = {
        id: `collection-${Date.now()}`,
        title,
        description,
        tags,
        images: images || [],
        moodBoardUrl,
        sketchUrl,
        status: 'draft',
        lastUpdated: new Date().toISOString().split('T')[0],
        items: 0,
        createdAt: new Date()
      };
      
      mockCollections.push(newCollection);
      res.status(201).json(newCollection);
    }
  } catch (error) {
    console.error('Error creating collection:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update collection (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, tags, images, moodBoardUrl, sketchUrl, status } = req.body;
    
    try {
      // Try to update in database
      const collection = await Collection.findById(req.params.id);
      
      if (!collection) {
        return res.status(404).json({ message: 'Collection not found' });
      }
      
      // Update fields
      if (title) collection.title = title;
      if (description) collection.description = description;
      if (tags) collection.tags = tags;
      if (images) collection.images = images;
      if (moodBoardUrl) collection.moodBoardUrl = moodBoardUrl;
      if (sketchUrl) collection.sketchUrl = sketchUrl;
      if (status) collection.status = status;
      
      collection.lastUpdated = Date.now();
      
      await collection.save();
      res.json(collection);
    } catch (dbError) {
      // If database error, update mock data
      console.log('Using mock collection update');
      const collectionIndex = mockCollections.findIndex(c => c.id === req.params.id);
      
      if (collectionIndex === -1) {
        return res.status(404).json({ message: 'Collection not found' });
      }
      
      // Update fields
      const updatedCollection = { ...mockCollections[collectionIndex] };
      if (title) updatedCollection.title = title;
      if (description) updatedCollection.description = description;
      if (tags) updatedCollection.tags = tags;
      if (images) updatedCollection.images = images;
      if (moodBoardUrl) updatedCollection.moodBoardUrl = moodBoardUrl;
      if (sketchUrl) updatedCollection.sketchUrl = sketchUrl;
      if (status) updatedCollection.status = status;
      
      updatedCollection.lastUpdated = new Date().toISOString().split('T')[0];
      
      mockCollections[collectionIndex] = updatedCollection;
      res.json(updatedCollection);
    }
  } catch (error) {
    console.error('Error updating collection:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete collection (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    try {
      // Try to delete from database
      const collection = await Collection.findById(req.params.id);
      
      if (!collection) {
        return res.status(404).json({ message: 'Collection not found' });
      }
      
      await collection.remove();
      res.json({ message: 'Collection removed' });
    } catch (dbError) {
      // If database error, update mock data
      console.log('Using mock collection deletion');
      const collectionIndex = mockCollections.findIndex(c => c.id === req.params.id);
      
      if (collectionIndex === -1) {
        return res.status(404).json({ message: 'Collection not found' });
      }
      
      mockCollections.splice(collectionIndex, 1);
      res.json({ message: 'Collection removed' });
    }
  } catch (error) {
    console.error('Error deleting collection:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;