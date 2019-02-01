const mongoose = require('mongoose');

const studioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: Object,
    required: true
  }
});

module.exports = mongoose.model('Studio', studioSchema);
