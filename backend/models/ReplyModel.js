const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const replySchema = new Schema({
  parentPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostModel',
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CommentModel'
  },
  parentReply: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ReplyModel'
  },
  commentOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  replyWriter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true,
  },
  replyBody: {
    type: String,
    required: true
  },
  replyCount: {
    type: Number,
    default: 0
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserModel'
    }
  ],
  unlikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserModel'
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('ReplyModel', replySchema);