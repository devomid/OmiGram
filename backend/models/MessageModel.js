const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const msgSchema = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  content: {
    type: String,
    trim: true
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatModel'
  },
  /*   likes: {
      type: Map, of: Boolean,
    }, */
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostModel',
  },
  chatPic: String
}, {
  timestamps: true
});

module.exports = mongoose.model('MsgModel', msgSchema);