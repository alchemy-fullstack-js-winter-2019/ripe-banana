const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new schema({
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
    part: String,
    actor: {
      type: Schema.Types.ObjectId,
      ref: 'Actor',
      required: true
    }
  }]
});

module.exports = mongoose.model('Film', schema);
