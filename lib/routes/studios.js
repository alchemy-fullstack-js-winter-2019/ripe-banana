const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router()

  .post('/', (req, res, next) => {
    const { name, address } = req.body;
    Studio
      .create({
        name, 
        address
      })
      .then(studio => res.send(studio))
      .catch(next);
  })
  .get('/', (re, res, next) => {
    Studio
      .find()
      .select('-__v -address')
      .then(studios => res.send(studios))
      .catch(next);  
  });
