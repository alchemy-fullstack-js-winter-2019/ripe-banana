const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true
  },
  reviewer: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  review: {
    type: String,
    max: 140,
    required: true
  },
  film: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    required: true,
  }
});

module.exports = mongoose.model('Review', reviewSchema);
