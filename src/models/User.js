const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: {
    type: String,
    required: true,
    unique: true, // code 11000
    validate: value => validator.isEmail(value)
  },
  phone: Number,
  dateJoined: Date,
  lastLogin: Date
});

module.exports = mongoose.model('User', userSchema);
