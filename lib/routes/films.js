const { Router } = require('express');
const Film = require('../models/Film');

module.exports = Router()

  .post('/', (req, res, next) => {
    const { name, address } = req.body;
    Film
      .create({
        name, 
        address
      })
      .then(film => res.send(film))
      .catch(next);
  });
