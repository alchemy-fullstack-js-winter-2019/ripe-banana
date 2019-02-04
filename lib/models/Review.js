const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: [5, '5 is the highest rating'],
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reviewer',
    required: true
  },
  review: {
    type: String,
    max: 140,
    required: true
  },
  film: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film',
    required: true
  },
  createdAt: {
    type: Date, 
    default: Date.now 
  },
  updatedAt: {
    type: Date, 
    default: Date.now
  }
});

module.exports = mongoose.model('Review', reviewSchema);
