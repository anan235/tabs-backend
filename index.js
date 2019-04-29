/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser').json();

const app = express();
const router = express.Router();

const User = require('./src/models/User');
const db = require('./src/db');

// GET
router.get('/', (req, res) => {
  res.send('Hello World!');
});

// POST
router.post('/createuser', bodyParser, (req, res) => {
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

app.use('/', router);

app.listen(3000, () => console.log('Listening on port 3000...'));
