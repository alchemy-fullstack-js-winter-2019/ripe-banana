const mongoose = require('mongoose');


const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  studio: {
    type: String,
    required: true
  },
  released: {
    type: Number,
    required: true
  },
  cast: {
    role: String,
    actor: String
  }
});

module.exports = mongoose.model('Film', filmSchema);
