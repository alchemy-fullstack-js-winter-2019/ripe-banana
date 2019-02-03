const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  studio: {
    type: Schema.Types.ObjectId,
    ref: 'Studio',
    required: true
  },
  released: {
    type: Number,
    required: true
  },
  cast: [{
    role: String,
    actor: String
  }]
});

module.exports = mongoose.model('Film', filmSchema);
