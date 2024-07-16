const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  chatName: {
    type: String,
    trim: true
  },
  isGroupChat: {
    type: Boolean,
    default: false
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  }],
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MsgModel'
  },
  groupAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ChatModel', chatSchema);