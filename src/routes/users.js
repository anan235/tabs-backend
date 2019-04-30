const users = require('express').Router();

// MODELS
const User = require('../models/User');

function getUser(req, res, next) {
  User.findById(req.params.id, (err, user) => {
    if (err) next(err);
    req.user = user;
    next();
  });
}

users.route('/:id')
  .get(getUser, (req, res) => {
    res.send(req.user);
  })
  .put((req, res) => {
    res.send('We got our put request!');
  });

module.exports = users;
