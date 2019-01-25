const { Router } = require('express');
const Tweet = require('../models/Actor');
const ronSwanson = require('../middleware/ronSwanson');

const patcher = (body, fields) => {
  return Object.keys(body)
    .reduce((acc, key) => {
      if(fields.includes(key) && body[key]) {
        acc[key] = body[key];
      }
      return acc;
    },  {});
};

module.exports = Router()
  .post('/', ronSwanson, (req, res, next) => {
    const { handle, text, tag } = req.body;
    if(req.query.random) {
      Tweet
        .create({ handle, text: req.quote, tag })
        .then(tweet => res.send(tweet))
        .catch(next);
    }
    else {
      Tweet
        .create({ handle, text, tag })
        .then(tweet => res.send(tweet))
        .catch(next);
    }
  })

  .patch('/:id', (req, res, next) => {
    const patched = patcher(req.body, ['handle', 'text']);
    Tweet
      .findByIdAndUpdate(req.params.id, patched, { new: true })
      .populate('handle', '-email -name -_id -__v')
      .select({ '__v': false })
      .then(updatedTweet => {
        res.send(updatedTweet);
      })
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Tweet
      .find()
      .populate('handle', '-email -name -_id -__v')
      .select({ '__v': false })
      .then(listOfTweets => {
        res.send(listOfTweets);
      })
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Tweet
      .findById(req.params.id)
      .populate('handle', '-email -name -_id -__v')
      .select({ '__v': false })
      .then(foundTweet => {
        res.send(foundTweet);
      })
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Tweet.findByIdAndDelete(req.params.id)
      .then(() => {
        res.send({ deleted: 1 });
      })
      .catch(next);
  });  
