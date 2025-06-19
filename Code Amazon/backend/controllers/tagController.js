const Tag = require('../models/Tag');

// @desc    Get all tags
// @route   GET /api/tags
// @access  Public
exports.getTags = async (req, res) => {
  try {
    const tags = await Tag.find().sort({ name: 1 });
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a tag
// @route   POST /api/tags
// @access  Private
exports.createTag = async (req, res) => {
  try {
    const { name, color } = req.body;
    
    // Check if tag already exists
    const tagExists = await Tag.findOne({ name });
    
    if (tagExists) {
      return res.status(400).json({ message: 'Tag already exists' });
    }
    
    const tag = await Tag.create({
      name,
      color: color || 'bg-neutral-100 text-neutral-700',
      createdBy: req.user._id
    });
    
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a tag
// @route   PUT /api/tags/:id
// @access  Private
exports.updateTag = async (req, res) => {
  try {
    const { name, color } = req.body;
    
    const tag = await Tag.findById(req.params.id);
    
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    
    // Check if new name already exists (if name is being changed)
    if (name && name !== tag.name) {
      const tagExists = await Tag.findOne({ name });
      
      if (tagExists) {
        return res.status(400).json({ message: 'Tag name already exists' });
      }
      
      tag.name = name;
    }
    
    if (color) {
      tag.color = color;
    }
    
    const updatedTag = await tag.save();
    
    res.json(updatedTag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a tag
// @route   DELETE /api/tags/:id
// @access  Private
exports.deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    
    await tag.remove();
    
    res.json({ message: 'Tag removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};