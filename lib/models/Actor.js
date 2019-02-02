const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  pob: {
    type: String,
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

module.exports = mongoose.model('Actor', actorSchema);
