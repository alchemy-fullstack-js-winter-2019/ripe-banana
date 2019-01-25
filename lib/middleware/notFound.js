module.exports = (req, res, next) => {
  res.statusCode = 404;
  res.send('Not found!');
  next();
};
