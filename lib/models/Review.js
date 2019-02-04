const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: 'Reviewer',
    required: true
  },
  review: {
    type: String,
    maxlength: 140,
    required: true
  },
  film: {
    type: Schema.Types.ObjectId,
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

module.exports = mongoose.model('Review', schema);
