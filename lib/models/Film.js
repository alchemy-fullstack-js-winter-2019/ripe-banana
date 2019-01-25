const mongoose = require('mongoose');


const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  studio: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  released: {
    type: Number,
    required: true
  },
  cast: {
    role: String,
    actor: mongoose.Schema.Types.ObjectId
  }
});

module.exports = mongoose.model('Film', filmSchema);
