const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  phone: Number,
  dateJoined: Date,
  lastLogin: Date
});

module.exports = mongoose.model('User', userSchema);
