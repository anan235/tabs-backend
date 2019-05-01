/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const app = express();

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

// GET home page
app.get('/', (req, res) => {
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
