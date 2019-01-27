const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  released: {
    type: String,
    required: true
  },
  studioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio',
    required: true
  }
});

module.exports = mongoose.model('Film', filmSchema);
