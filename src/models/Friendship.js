const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'accepted', 'rejected']
  }
}, { timestamps: true });

const Friendship = mongoose.model('Friendship', friendSchema);

module.exports = Friendship;
