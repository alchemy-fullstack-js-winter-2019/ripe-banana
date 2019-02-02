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
},
{
  toJSON:{
    transform: function(doc, ret) {
      delete ret.__v;
    }
  }
});

module.exports = mongoose.model('Studio', studioSchema);
