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
  });

users.post('/create', (req, res) => {
  User.create({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    phone: req.body.phone,
    dateJoined: Date.now(),
    lastLogin: null
  }, (err, newUser) => {
    if (err) res.send(err);
    else res.send(`Welcome ${newUser.fname} ${newUser.lname}`);
  });
});

module.exports = users;
