/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const app = express();
const router = express.Router();

// connect to mongo
module.exports = mongoose.connect('mongodb://localhost:27017/tabs');
const db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'shhquietchangeinprod',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));
app.use('/api', require('./src/routes/api'));

// Middleware
function requiresLogin(req, res, next) {
  console.log(req.session);
  if (req.session && req.session.userId) {
    return next();
  }
  const err = new Error('You must be logged in to view this page.');
  err.status = 401;
  return next(err);
}

// GET home page
app.get('/', requiresLogin, (req, res) => {
  console.log(req.session);
  res.send('Hello World!');
});

// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

// start server
app.listen(3000, () => console.log('Listening on port 3000...'));
