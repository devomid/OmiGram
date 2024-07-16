const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true
  },
  postBody: {
    type: String
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
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CommentModel',
    default: null
  },
  location: {
    type: {
      latitude: Number,
      longitude: Number
    }
  },
  postPicture: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('PostModel', postSchema);
