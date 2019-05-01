const users = require('express').Router();

// MODELS
const User = require('../models/User');
const Friendship = require('../models/Friendship');

// Custom Middleware
function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) return next();
  const err = new Error('User must be logged in.');
  err.status = 401;
  return next(err);
}

// ROUTES
users.post('/addfriend/:id', requiresLogin, (req, res, next) => {
  const contacts = {
    sender: req.session.userId,
    recipient: req.params.id
  };
  // TODO: dont send request if already in accepted state
  // TODO: only allow request to be resent if still in pending state after some time
  // TODO: only allow request to be resent if in rejected state for 5 days
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

users.post('/acceptfriend/:id', requiresLogin, (req, res, next) => {
  Friendship.findById(req.params.id, (err, fRequest) => {
    if (err) return next(err);
    // if request was sent by someone other than recipient of request throw 401
    // eslint-disable-next-line eqeqeq
    if (fRequest.recipient != req.session.userId) {
      const error = new Error('lacking credentials to accept friend request');
      error.status = 401;
      return next(error);
    }
    const updatedRequest = fRequest;
    if (updatedRequest.status !== 'accepted') {
      updatedRequest.status = 'accepted';
      updatedRequest.save((saveErr) => {
        if (saveErr) return next(saveErr);
        return res.send('Added Friend!');
      });
    }
    else return next(err);
    return null;
  });
});

users.post('/rejectfriend/:id', requiresLogin, (req, res, next) => {
  Friendship.findById(req.params.id, (err, fRequest) => {
    if (err) return next(err);
    // if request was sent by someone other than recipient of request throw 401
    // eslint-disable-next-line eqeqeq
    if (fRequest.recipient != req.session.userId) {
      const error = new Error('lacking credentials to reject friend request');
      error.status = 401;
      return next(error);
    }
    const updatedRequest = fRequest;
    if (updatedRequest.status !== 'accepted') {
      updatedRequest.status = 'rejected';
      updatedRequest.save((saveErr) => {
        if (saveErr) return next(saveErr);
        return res.send('Rejected Friend Request');
      });
    }
    else return next(err);
    return null;
  });
});

users.post('/removefriend/:id', requiresLogin, (req, res, next)=>{
  Friendship.findByIdAndRemove(req.params.id, (err, fRequest) => {
    if (err) return next(err);
    // if request was sent by someone other than recipient of request throw 401
    if(fRequest.recipient != req.session.userId){
      const error = new Error('lacking credentials to remove friend');
      error.status = 401;
      return next(error);
    }

    const updatedRequest = fRequest;
    if(updatedRequest.status == 'accepted'){
      updatedRequest.status = 'remove';
      updatedRequest.save((saveErr) => {
        if (saveErr) return next(saveErr);
        return res.send('Removed Friend');
    });
  }
    else return next(err);
    return null
});
});

module.exports = users;
