const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  message: {
    type: String,
  }
});

module.exports = Message = mongoose.model('messages', MessageSchema);