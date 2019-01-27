const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  pob: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Film', filmSchema);
