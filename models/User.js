const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nickname: {
    type: String,  // Unique
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  create_time: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Number,
    required: true
  }
});

module.exports = User = mongoose.model('user', UserSchema);