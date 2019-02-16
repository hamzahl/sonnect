const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false
  }
});

module.exports = User = mongoose.model('users', UserSchema);