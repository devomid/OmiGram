const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  parentPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostModel',
  },
  commentWriter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true,
  },
  commentBody: {
    type: String,
    required: true
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
  ],
  replyCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CommentModel', commentSchema);