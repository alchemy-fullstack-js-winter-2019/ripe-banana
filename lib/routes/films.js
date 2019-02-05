const { Router } = require('express');
const Film = require('../models/Film');
const Review = require('../models/Review');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { title, released, studio } = req.body;
    Film
      .create({ title, released, studio })
      .then(films => res.send(films))
      .catch(next);
  })
    
  .get('/:id', (req, res, next) => {
    const _id = req.params.id;
    
    Promise.all([
      Film
        .findById(_id)
        .lean()
        .select('title studio released cast')
        .populate({
          path: 'cast.actor',
          select: 'name'
        })
        .populate({
          path: 'studio',
          select: 'name'
        }),

      Review.find({ film: _id })
        .lean()
        .select('rating review reviewer')
        .populate({
          path: 'reviewer',
          select: 'name'
        })
    ])
      .then(([film, reviews]) =>  {
        film.reviews = reviews;
        res.send(film);
      })
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Film
      .find()
      .lean()
      .select('title studio released')
      .populate({
        path: 'studio',
        select: 'name'
      })
      .then(films => res.send(films))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Film
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .lean()
      .select('title studio released')
      .populate({
        path: 'studio',
        select: 'name'
      })
      .then(updatedFilm => res.send(updatedFilm))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Film
      .findByIdAndDelete(req.params.id)
      .then(() => res.send({ deleted: 1 }))
      .catch(next);
  });
