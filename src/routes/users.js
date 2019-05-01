const users = require('express').Router();

// MODELS
const User = require('../models/User');
const Friendship = require('../models/Friendship');

// Custom Middleware
function getUser(req, res, next) {
  User.findById(req.params.id, (err, user) => {
    if (err) next(err);
    req.user = user;
    next();
  });
}

function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) return next();
  const err = new Error('User must be logged in.');
  err.status = 401;
  return next(err);
}

users.post('/addfriend/:id', requiresLogin, (req, res, next) => {
  const contacts = {
    sender: req.session.userId,
    recipient: req.params.id
  };
  Friendship.findOneAndUpdate(contacts,
    { status: 'pending' },
    { upsert: true, new: true },
    (err, receipt) => {
      if (err) return next(err);
      return res.send(receipt);
    });
});

users.get('/getfriends', requiresLogin, (req, res, next) => {
  User.getFriends(req.session.userId, (err, pendingReqs) => {
    if (err) return next(err);
    return res.send(pendingReqs);
  });
});

module.exports = users;
