#!/bin/bash

# Script to fix issues in collectionController.js
# Created by Amazon Q

echo "Starting to fix collectionController.js..."

# Backup the original file
cp /Users/renato/Documents/GitHub/El-portafolio/backend/controllers/collectionController.js /Users/renato/Documents/GitHub/El-portafolio/backend/controllers/collectionController.js.bak
echo "Original file backed up as collectionController.js.bak"

# Create the fixed version of the file
cat > /Users/renato/Documents/GitHub/El-portafolio/backend/controllers/collectionController.js << 'EOL'
const Collection = require('../models/Collection');
const Design = require('../models/Design');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');

// Helper function to sanitize input
const sanitizeInput = (input) => {
  if (typeof input === 'string') {
    return sanitizeHtml(input, {
      allowedTags: [],
      allowedAttributes: {}
    });
  }
  return input;
};

// Helper function to sanitize object fields
const sanitizeObject = (obj) => {
  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item => 
        typeof item === 'string' ? sanitizeInput(item) : item
      );
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
};

// Helper function to check if user is authorized for collection operations
const isAuthorized = (user, collection) => {
  // Check if user is admin or the creator of the collection
  return user.role === 'admin' || 
         (collection.createdBy && collection.createdBy.toString() === user._id.toString());
};

// @desc    Get all collections
// @route   GET /api/collections
// @access  Public
exports.getCollections = async (req, res) => {
  try {
    // Only return published collections for regular users
    const filter = req.user && req.user.role === 'admin' ? 
      { isDeleted: { $ne: true } } : 
      { status: 'published', isDeleted: { $ne: true } };
    
    const collections = await Collection.find(filter)
      .sort({ createdAt: -1 });
    
    res.json(collections);
  } catch (error) {
    console.error('Error getting collections:', error);
    res.status(500).json({ message: 'Server error while retrieving collections' });
  }
};

// @desc    Get single collection
// @route   GET /api/collections/:id
// @access  Public
exports.getCollectionById = async (req, res) => {
  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid collection ID format' });
    }

    const collection = await Collection.findOne({ 
      _id: req.params.id,
      isDeleted: { $ne: true }
    });
    
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    
    // For non-admin users, only allow access to published collections
    if (collection.status !== 'published' && (!req.user || req.user.role !== 'admin')) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Get designs for this collection
    const designs = await Design.find({ 
      collectionId: collection._id,
      isDeleted: { $ne: true }
    });
    
    res.json({
      ...collection.toObject(),
      designs
    });
  } catch (error) {
    console.error('Error getting collection by ID:', error);
    res.status(500).json({ message: 'Server error while retrieving collection' });
  }
};

// @desc    Create a collection
// @route   POST /api/collections
// @access  Private
exports.createCollection = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Sanitize inputs
    const sanitizedData = sanitizeObject(req.body);
    const { title, description, tags, moodBoardUrl, sketchUrl, images } = sanitizedData;
    
    // Validate required fields
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    
    // Start a transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      const collection = await Collection.create([{
        title,
        description,
        tags: tags || [],
        moodBoardUrl,
        sketchUrl,
        images: images || [],
        createdBy: req.user._id,
        lastUpdated: Date.now(),
        isDeleted: false
      }], { session });
      
      await session.commitTransaction();
      session.endSession();
      
      res.status(201).json(collection[0]);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error('Error creating collection:', error);
    res.status(500).json({ message: 'Server error while creating collection' });
  }
};

// @desc    Update a collection
// @route   PUT /api/collections/:id
// @access  Private
exports.updateCollection = async (req, res) => {
  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid collection ID format' });
    }

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Sanitize inputs
    const sanitizedData = sanitizeObject(req.body);
    const { title, description, tags, moodBoardUrl, sketchUrl, images, status } = sanitizedData;
    
    const collection = await Collection.findOne({ 
      _id: req.params.id,
      isDeleted: { $ne: true }
    });
    
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    
    // Check authorization
    if (!isAuthorized(req.user, collection)) {
      return res.status(403).json({ message: 'Not authorized to update this collection' });
    }
    
    // Start a transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Update fields
      if (title !== undefined) collection.title = title;
      if (description !== undefined) collection.description = description;
      if (tags !== undefined) collection.tags = tags;
      if (moodBoardUrl !== undefined) collection.moodBoardUrl = moodBoardUrl;
      if (sketchUrl !== undefined) collection.sketchUrl = sketchUrl;
      if (images !== undefined) collection.images = images;
      if (status !== undefined && ['draft', 'published'].includes(status)) {
        collection.status = status;
      }
      
      collection.lastUpdated = Date.now();
      
      const updatedCollection = await collection.save({ session });
      
      // Get designs for this collection
      const designs = await Design.find({ 
        collectionId: updatedCollection._id,
        isDeleted: { $ne: true }
      }).session(session);
      
      await session.commitTransaction();
      session.endSession();
      
      res.json({
        ...updatedCollection.toObject(),
        designs
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error('Error updating collection:', error);
    res.status(500).json({ message: 'Server error while updating collection' });
  }
};

// @desc    Delete a collection (soft delete)
// @route   DELETE /api/collections/:id
// @access  Private
exports.deleteCollection = async (req, res) => {
  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid collection ID format' });
    }

    const collection = await Collection.findOne({ 
      _id: req.params.id,
      isDeleted: { $ne: true }
    });
    
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    
    // Check authorization
    if (!isAuthorized(req.user, collection)) {
      return res.status(403).json({ message: 'Not authorized to delete this collection' });
    }
    
    // Start a transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Soft delete all designs associated with this collection
      await Design.updateMany(
        { collectionId: collection._id },
        { isDeleted: true, lastUpdated: Date.now() },
        { session }
      );
      
      // Soft delete the collection
      collection.isDeleted = true;
      collection.lastUpdated = Date.now();
      await collection.save({ session });
      
      await session.commitTransaction();
      session.endSession();
      
      res.json({ message: 'Collection removed' });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error('Error deleting collection:', error);
    res.status(500).json({ message: 'Server error while deleting collection' });
  }
};

// @desc    Hard delete a collection (admin only)
// @route   DELETE /api/collections/:id/hard
// @access  Private (Admin only)
exports.hardDeleteCollection = async (req, res) => {
  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid collection ID format' });
    }

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    
    const collection = await Collection.findById(req.params.id);
    
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    
    // Start a transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Delete all designs associated with this collection
      await Design.deleteMany({ collectionId: collection._id }, { session });
      
      // Delete the collection
      await Collection.findByIdAndDelete(collection._id, { session });
      
      await session.commitTransaction();
      session.endSession();
      
      res.json({ message: 'Collection permanently removed' });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error('Error hard deleting collection:', error);
    res.status(500).json({ message: 'Server error while permanently deleting collection' });
  }
};

// @desc    Publish a collection
// @route   PUT /api/collections/:id/publish
// @access  Private
exports.publishCollection = async (req, res) => {
  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid collection ID format' });
    }

    const collection = await Collection.findOne({ 
      _id: req.params.id,
      isDeleted: { $ne: true }
    });
    
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    
    // Check authorization
    if (!isAuthorized(req.user, collection)) {
      return res.status(403).json({ message: 'Not authorized to publish this collection' });
    }
    
    // Start a transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      collection.status = 'published';
      collection.lastUpdated = Date.now();
      
      const updatedCollection = await collection.save({ session });
      
      // Get designs for this collection
      const designs = await Design.find({ 
        collectionId: updatedCollection._id,
        isDeleted: { $ne: true }
      }).session(session);
      
      await session.commitTransaction();
      session.endSession();
      
      res.json({
        ...updatedCollection.toObject(),
        designs
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error('Error publishing collection:', error);
    res.status(500).json({ message: 'Server error while publishing collection' });
  }
};

// @desc    Unpublish a collection
// @route   PUT /api/collections/:id/unpublish
// @access  Private
exports.unpublishCollection = async (req, res) => {
  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid collection ID format' });
    }

    const collection = await Collection.findOne({ 
      _id: req.params.id,
      isDeleted: { $ne: true }
    });
    
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    
    // Check authorization
    if (!isAuthorized(req.user, collection)) {
      return res.status(403).json({ message: 'Not authorized to unpublish this collection' });
    }
    
    // Start a transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      collection.status = 'draft';
      collection.lastUpdated = Date.now();
      
      const updatedCollection = await collection.save({ session });
      
      // Get designs for this collection
      const designs = await Design.find({ 
        collectionId: updatedCollection._id,
        isDeleted: { $ne: true }
      }).session(session);
      
      await session.commitTransaction();
      session.endSession();
      
      res.json({
        ...updatedCollection.toObject(),
        designs
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error('Error unpublishing collection:', error);
    res.status(500).json({ message: 'Server error while unpublishing collection' });
  }
};

// @desc    Restore a soft-deleted collection
// @route   PUT /api/collections/:id/restore
// @access  Private
exports.restoreCollection = async (req, res) => {
  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid collection ID format' });
    }

    const collection = await Collection.findOne({ 
      _id: req.params.id,
      isDeleted: true
    });
    
    if (!collection) {
      return res.status(404).json({ message: 'Deleted collection not found' });
    }
    
    // Check authorization
    if (!isAuthorized(req.user, collection)) {
      return res.status(403).json({ message: 'Not authorized to restore this collection' });
    }
    
    // Start a transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Restore the collection
      collection.isDeleted = false;
      collection.lastUpdated = Date.now();
      await collection.save({ session });
      
      // Restore associated designs
      await Design.updateMany(
        { collectionId: collection._id, isDeleted: true },
        { isDeleted: false, lastUpdated: Date.now() },
        { session }
      );
      
      await session.commitTransaction();
      session.endSession();
      
      res.json({ message: 'Collection restored successfully' });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error('Error restoring collection:', error);
    res.status(500).json({ message: 'Server error while restoring collection' });
  }
};
EOL

echo "Fixed collectionController.js created"

# Check if the dependencies are installed
echo "Checking for required dependencies..."

# Create a script to install required dependencies
cat > /Users/renato/Documents/GitHub/El-portafolio/install_dependencies.sh << 'EOL'
#!/bin/bash

cd /Users/renato/Documents/GitHub/El-portafolio

# Check if package.json exists in the backend directory
if [ -f "./backend/package.json" ]; then
  cd ./backend
  
  # Check if express-validator is installed
  if ! grep -q "express-validator" package.json; then
    echo "Installing express-validator..."
    npm install --save express-validator
  fi
  
  # Check if sanitize-html is installed
  if ! grep -q "sanitize-html" package.json; then
    echo "Installing sanitize-html..."
    npm install --save sanitize-html
  fi
  
  echo "Dependencies installed successfully!"
else
  echo "Error: package.json not found in backend directory"
  exit 1
fi
EOL

# Make the scripts executable
chmod +x /Users/renato/Documents/GitHub/El-portafolio/fix_collection_controller.sh
chmod +x /Users/renato/Documents/GitHub/El-portafolio/install_dependencies.sh

echo "Scripts are now executable"
echo ""
echo "=== Fix Complete ==="
echo ""
echo "The following issues have been fixed in collectionController.js:"
echo "1. Added authorization checks for all operations"
echo "2. Added input validation and sanitization"
echo "3. Replaced deprecated .remove() method with proper alternatives"
echo "4. Implemented soft delete functionality"
echo "5. Added transaction support for data consistency"
echo "6. Added error logging"
echo "7. Added ID validation"
echo "8. Added restore functionality for soft-deleted collections"
echo "9. Added hard delete functionality (admin only)"
echo ""
echo "To apply the fixes:"
echo "1. Run ./install_dependencies.sh to install required dependencies"
echo "2. Run ./fix_collection_controller.sh to apply the fixes"
echo ""
echo "Note: The original file has been backed up as collectionController.js.bak"