/* eslint-disable no-underscore-dangle */
const api = require('express').Router();
const User = require('../models/User');

api.use('/users', (req, res, next) => {
  next();
}, require('./users'));

// eslint-disable-next-line consistent-return
api.post('/register', (req, res, next) => {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    const err = new Error('Passwords do not match.');
    err.status = 400;
    return next(err);
  }
  if (req.body.email
    && req.body.password
    && req.body.passwordConf
    && req.body.phone) {
    const newUserData = {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      dateJoined: Date.now()
    };
    User.create(newUserData, (err, newUser) => {
      if (err) return next(err);
      req.session.userId = newUser._id;
      return res.redirect('/');
    });
  }
  else {
    const err = new Error('Not all required fields have been filled');
    err.status = 400;
    return next(err);
  }
});

// eslint-disable-next-line consistent-return
api.post('/login', (req, res, next) => {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, (authErr, user) => {
      if (authErr || !user) {
        const err = new Error('Wrong email or password');
        err.status = 401;
        return next(err);
      }
      req.session.userId = user._id;
      return res.redirect('/');
    });
  }
  else {
    const err = new Error('Missing email or password');
    err.status = 400;
    return next(err);
  }
});

api.post('/logout', (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy((err) => {
      if (err) return next(err);
      return res.redirect('/');
    });
  }
});

module.exports = api;
