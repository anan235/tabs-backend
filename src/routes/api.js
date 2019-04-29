const api = require('express').Router();

api.use('/users', (req, res, next) => {
  next();
}, require('./users'));

module.exports = api;
