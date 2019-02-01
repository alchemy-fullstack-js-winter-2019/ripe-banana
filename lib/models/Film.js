const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  studio: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  released: {
    type: Number,
    required: true
  },
  cast: {
    type: Array,
    required: true
  }
},
{
  toJSON:{
    transform: function(doc, ret) {
      delete ret.__v;
    }
  }
});

module.exports = mongoose.model('Film', filmSchema);
