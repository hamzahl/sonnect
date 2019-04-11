const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
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
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'friends'
  }]
});

module.exports = User = mongoose.model('users', UserSchema);