const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewerSchema = Schema({
  name: {
    type: String,
    required: true
  },
  company: {
    website: { 
      type: String, 
      required: true
    }
  }
});

const Reviewer = mongoose.model('Reviewer', reviewerSchema);

module.exports = Reviewer;
