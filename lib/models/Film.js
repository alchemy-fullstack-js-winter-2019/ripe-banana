const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmSchema = Schema({
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
    maxlength: 4,
    required: true 
  },
  cast: [{
    role: String,
    actor: {
      type: Schema.Types.ObjectId,
      ref: 'Actor',
      required: true
    }
  }]
});

const Film = mongoose.model('Film', filmSchema);

module.exports = Film;
