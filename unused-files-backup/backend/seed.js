const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Collection = require('./models/Collection');
const Design = require('./models/Design');
const Tag = require('./models/Tag');
const Feature = require('./models/Feature');
const About = require('./models/About');

// Sample data
const userData = {
  username: 'admin',
  email: 'admin@example.com',
  password: 'password123',
  role: 'admin'
};

const tagData = [
  { name: 'Minimalist', color: 'bg-neutral-100 text-neutral-700' },
  { name: 'Professional', color: 'bg-blue-100 text-blue-700' },
  { name: 'Sustainable', color: 'bg-green-100 text-green-700' },
  { name: 'Bold', color: 'bg-purple-100 text-purple-700' },
  { name: 'Luxury', color: 'bg-amber-100 text-amber-700' },
  { name: 'Statement', color: 'bg-red-100 text-red-700' }
];

const featureData = [
  { name: 'Notched lapels' },
  { name: 'Single button closure' },
  { name: 'Flap pockets' },
  { name: 'Relaxed fit' },
  { name: 'V-neck design' },
  { name: 'Ruffled sleeves' },
  { name: 'Loose fit' },
  { name: 'Silk construction' }
];

const aboutData = {
  paragraphs: [
    'With a passion for sustainable fashion and innovative design, I create collections that bridge the gap between contemporary aesthetics and timeless appeal. My work focuses on clean silhouettes, quality materials, and versatile pieces that empower the modern individual.',
    'Drawing inspiration from minimalist architecture, natural textures, and cultural diversity, each design reflects a commitment to both style and substance. I believe fashion should be both beautiful and responsible, creating pieces that last beyond seasonal trends.'
  ],
  media: []
};

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Seed function
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Collection.deleteMany({});
    await Design.deleteMany({});
    await Tag.deleteMany({});
    await Feature.deleteMany({});
    await About.deleteMany({});
    
    console.log('Database cleared');
    
    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    const user = await User.create({
      ...userData,
      password: hashedPassword
    });
    
    console.log('Admin user created');
    
    // Create tags
    const tags = await Tag.insertMany(
      tagData.map(tag => ({
        ...tag,
        createdBy: user._id
      }))
    );
    
    console.log('Tags created');
    
    // Create features
    const features = await Feature.insertMany(
      featureData.map(feature => ({
        ...feature,
        createdBy: user._id
      }))
    );
    
    console.log('Features created');
    
    // Create about
    const about = await About.create({
      ...aboutData,
      updatedBy: user._id
    });
    
    console.log('About content created');
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();