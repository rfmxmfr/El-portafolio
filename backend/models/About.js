const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  paragraphs: [{
    type: String,
    required: true
  }],
  media: [{
    id: String,
    type: String,
    url: String,
    title: String,
    position: Number
  }],
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('About', AboutSchema);