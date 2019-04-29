/* eslint-disable no-console */
const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://localhost:27017/tabs')
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Database connection error');
  });
