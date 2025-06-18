const Design = require('../models/Design');
const Collection = require('../models/Collection');

// @desc    Get all designs
// @route   GET /api/designs
// @access  Public
exports.getDesigns = async (req, res) => {
  try {
    const designs = await Design.find()
      .sort({ createdAt: -1 })
      .populate('collectionId', 'title');
    
    res.json(designs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single design
// @route   GET /api/designs/:id
// @access  Public
exports.getDesignById = async (req, res) => {
  try {
    const design = await Design.findById(req.params.id)
      .populate('collectionId', 'title');
    
    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }
    
    res.json(design);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a design
// @route   POST /api/designs
// @access  Private
exports.createDesign = async (req, res) => {
  try {
    const { title, description, imageUrl, details, collectionId } = req.body;
    
    // Check if collection exists
    const collection = await Collection.findById(collectionId);
    
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    
    const design = await Design.create({
      title,
      description,
      imageUrl,
      details: details || [],
      collectionId,
      createdBy: req.user._id
    });
    
    // Update collection's lastUpdated field
    collection.lastUpdated = Date.now();
    await collection.save();
    
    res.status(201).json(design);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a design
// @route   PUT /api/designs/:id
// @access  Private
exports.updateDesign = async (req, res) => {
  try {
    const { title, description, imageUrl, details } = req.body;
    
    const design = await Design.findById(req.params.id);
    
    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }
    
    // Update fields
    if (title !== undefined) design.title = title;
    if (description !== undefined) design.description = description;
    if (imageUrl !== undefined) design.imageUrl = imageUrl;
    if (details !== undefined) design.details = details;
    
    const updatedDesign = await design.save();
    
    // Update collection's lastUpdated field
    const collection = await Collection.findById(design.collectionId);
    if (collection) {
      collection.lastUpdated = Date.now();
      await collection.save();
    }
    
    res.json(updatedDesign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a design
// @route   DELETE /api/designs/:id
// @access  Private
exports.deleteDesign = async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);
    
    if (!design) {
      return res.status(404).json({ message: 'Design not found' });
    }
    
    // Store collection ID before deleting design
    const collectionId = design.collectionId;
    
    // Delete the design
    await design.remove();
    
    // Update collection's lastUpdated field
    const collection = await Collection.findById(collectionId);
    if (collection) {
      collection.lastUpdated = Date.now();
      await collection.save();
    }
    
    res.json({ message: 'Design removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};