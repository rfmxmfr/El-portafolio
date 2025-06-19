const Feature = require('../models/Feature');

// @desc    Get all features
// @route   GET /api/features
// @access  Public
exports.getFeatures = async (req, res) => {
  try {
    const features = await Feature.find().sort({ name: 1 });
    res.json(features);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a feature
// @route   POST /api/features
// @access  Private
exports.createFeature = async (req, res) => {
  try {
    const { name } = req.body;
    
    // Check if feature already exists
    const featureExists = await Feature.findOne({ name });
    
    if (featureExists) {
      return res.status(400).json({ message: 'Feature already exists' });
    }
    
    const feature = await Feature.create({
      name,
      createdBy: req.user._id
    });
    
    res.status(201).json(feature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a feature
// @route   PUT /api/features/:id
// @access  Private
exports.updateFeature = async (req, res) => {
  try {
    const { name } = req.body;
    
    const feature = await Feature.findById(req.params.id);
    
    if (!feature) {
      return res.status(404).json({ message: 'Feature not found' });
    }
    
    // Check if new name already exists (if name is being changed)
    if (name && name !== feature.name) {
      const featureExists = await Feature.findOne({ name });
      
      if (featureExists) {
        return res.status(400).json({ message: 'Feature name already exists' });
      }
      
      feature.name = name;
    }
    
    const updatedFeature = await feature.save();
    
    res.json(updatedFeature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a feature
// @route   DELETE /api/features/:id
// @access  Private
exports.deleteFeature = async (req, res) => {
  try {
    const feature = await Feature.findById(req.params.id);
    
    if (!feature) {
      return res.status(404).json({ message: 'Feature not found' });
    }
    
    await feature.remove();
    
    res.json({ message: 'Feature removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};