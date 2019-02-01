const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = Schema({
  rating: {
    type: Number,
    required: true
  },
  reviewer: {
    ref: 'Reviewer',
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  review: {
    type: String,
    maxlength: 140,
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

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
