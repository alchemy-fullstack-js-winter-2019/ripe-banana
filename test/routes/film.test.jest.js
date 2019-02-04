require('dotenv').config();
require('../../lib/utils/connect')();
const Film = require('../../lib/models/Film');
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');
 

let createdFilm = ( title: { 
  type:'String',
  required: true
},
studio: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Studio',
  required: true
},
release: {
  type: Number,
  maxlength: 4,
  required: true
},
cast: [{
  role: { 
    type:'String' }
  ,
  actor: {
    type: mongoose.Schema.Types.ObjectId, 
    ref:'Actor',
    required: true
  }
}])