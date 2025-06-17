const About = require('../models/About');

// @desc    Get about content
// @route   GET /api/about
// @access  Public
exports.getAbout = async (req, res) => {
  try {
    // Get the most recent about content or create default if none exists
    let about = await About.findOne().sort({ updatedAt: -1 });
    
    if (!about) {
      about = await About.create({
        paragraphs: [
          'With a passion for sustainable fashion and innovative design, I create collections that bridge the gap between contemporary aesthetics and timeless appeal. My work focuses on clean silhouettes, quality materials, and versatile pieces that empower the modern individual.',
          'Drawing inspiration from minimalist architecture, natural textures, and cultural diversity, each design reflects a commitment to both style and substance. I believe fashion should be both beautiful and responsible, creating pieces that last beyond seasonal trends.'
        ],
        media: []
      });
    }
    
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update about content
// @route   PUT /api/about
// @access  Private
exports.updateAbout = async (req, res) => {
  try {
    const { paragraphs, media } = req.body;
    
    if (!paragraphs || !Array.isArray(paragraphs)) {
      return res.status(400).json({ message: 'Paragraphs are required and must be an array' });
    }
    
    // Create a new about document (to keep history)
    const about = await About.create({
      paragraphs,
      media: media || [],
      updatedBy: req.user._id,
      updatedAt: Date.now()
    });
    
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};