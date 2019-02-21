const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  token: {
    type: String,
    required: true
  },
  createAt:{
    type: Date,
    required: true,
    default: Date.now,
    expires: 86400 // time to live, document expires after 43,200s
  }
});

module.exports = Token = mongoose.model('tokens', TokenSchema);