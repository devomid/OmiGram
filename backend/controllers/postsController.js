const mongoose = require('mongoose');
const UserModel = require('../models/UserModel');
const PostModel = require('../models/PostModel');
const formidable = require('formidable');
const cloudinary = require('cloudinary');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config()

/* CREATE */ /* POST method */
const createNewPost = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
  });

  const form = new formidable.IncomingForm();
  const uploadsFolder = path.join(__dirname, '../public/uploads/posts');

  form.multiples = true;
  form.maxFileSize = 50 * 1024 * 1024; //50 MB
  form.uploadDir = uploadsFolder;
  form.parse(req, async (error, fields, files) => {
    try {
      const username = fields.username[0];
      const postBody = fields.postBody[0];
      if (fields.latitude) {
        var lat = fields.latitude[0];
      };
      if (fields.longitude) {
        var lon = fields.longitude[0];
      };
      const file = files.postPic
      const userPosting = await UserModel.findOne({ username });

      if (file && file.length > 0) {
        const filePath = file[0].filepath;
        const cloudinaryResult = await cloudinary.v2.uploader.upload(filePath);
        const cloudinaryURL = cloudinaryResult.secure_url
        var postPicPath = cloudinaryURL

      } else if (files.files instanceof Array && files.files.length > 0) {
        return

      } else {
        return res.json({ ok: false, msg: 'No files uploaded' });
      }

      if (!userPosting) return (res.status(404).json({ message: 'User not found.' }));

      const newPost = new PostModel({
        author: userPosting._id,
        postBody: postBody,
        likes: [],
        unlikes: [],
        // comments: {},
        postPicture: postPicPath,
      });

      if (lat && lon) {
        newPost.location = {
          latitude: lat,
          longitude: lon
        }
      }

      await newPost.save();

      if (error) {
        return res.json({ ok: false, msg: 'Error parsing files' })
      };
      return res.status(201).json(newPost);

    } catch (error) {
      return (res.status(400).json({ error: error.message }));
    };
  })
};

/* READ POSTS FROM DB */ /* GET method */
const getAllUserPosts = async (req, res) => {
  try {
    const username = req.params.username;

    const user = await UserModel.findOne({ username });
    if (!user) return (res.status(404).json({ message: 'User not found' }));

    const userAllPosts = await PostModel.find({ author: user._id })
      .populate('likes')
      .populate('unlikes')
      .populate('author').sort({ createdAt: -1 });

    res.status(200).json({ userPosts: userAllPosts, user })

  } catch (error) {
    return (res.status(404).json({ error: error.message }));
  };
};

const getSinglePost = async (req, res) => {
  try {
    const username = req.params.username;

    const user = await UserModel.findOne({ username });
    if (!user) return (res.status(404).json({ message: 'User not found' }));

    const singlePost = await PostModel.findOne({ author: user.username });

    singlePost ? (
      res.status(200).json(singlePost)) : (
      res.status(404).json({ message: 'Post not found' }));

  } catch (error) {
    return (res.status(400).json({ error: error.message }));
  };
};

/* EDIT AND UPDATE A POST */
const editPost = async (req, res) => {
  const { postId } = req.params;
  const form = new formidable.IncomingForm();
  form.parse(req, async (error, fields, files) => {
    try {
      const userId = fields.userId
      const editedPostBody = fields.postBody.toString()

      const postToEdit = await PostModel.findByIdAndUpdate({ _id: postId, author: userId }, { postBody: editedPostBody }, { new: true });

      postToEdit ? (
        res.status(200).json(postToEdit)) : (
        res.status(404).json({ message: 'Post not found' }));

    } catch (error) {
      return (res.status(400).json({ error: error.message }));
    };
  })
};

/* DELETE A POST */
const deletePost = async (req, res) => {
  try {
    const { userId } = req.body;
    const { postId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(404).json({ error: 'Post not found' })
    };

    const postToDelete = await PostModel.findByIdAndDelete({ _id: postId, author: userId });

    postToDelete ? (
      res.status(200).json(postToDelete)) : (
      res.status(404).json({ message: 'Post not found' }));

  } catch (error) {
    return (res.status(400).json({ error: error.message }));
  };
};

const likeAPost = async (req, res) => {
  const userId = req.body._id;
  const { postId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(404).json({ error: 'Post not found' })
  };
  try {
    let postToLike = await PostModel.findById(postId);

    if (!postToLike) {
      res.status(404).json({ message: 'Post not found' });
    };
    const UnlikeruserIndex = postToLike.unlikes.indexOf(userId);
    const likeruserIndex = postToLike.likes.indexOf(userId);
    if (likeruserIndex > -1) {
      postToLike.likes.splice(likeruserIndex, 1);
    } else {
      if (UnlikeruserIndex > -1) {
        postToLike.unlikes.splice(UnlikeruserIndex, 1);
      }
      postToLike.likes.push(userId);
    }
    await postToLike.save();
    postToLike = await postToLike.populate('likes', 'avatar username');
    res.status(200).json(postToLike);

  } catch (error) {
    return (res.status(400).json({ error: error.message }));
  }
};

const unlikeAPost = async (req, res) => {
  const userId = req.body._id;
  const { postId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(404).json({ error: 'Post not found' })
  };
  try {
    let postToUnlike = await PostModel.findById(postId);

    if (!postToUnlike) {
      res.status(404).json({ message: 'Post not found' });
    };
    const likeruserIndex = postToUnlike.likes.indexOf(userId);
    const UnlikeruserIndex = postToUnlike.unlikes.indexOf(userId);
    if (UnlikeruserIndex > -1) {
      postToUnlike.unlikes.splice(UnlikeruserIndex, 1);
    } else {
      if (likeruserIndex > -1) {
        postToUnlike.likes.splice(likeruserIndex, 1);
      }
      postToUnlike.unlikes.push(userId);
    }
    await postToUnlike.save();
    postToUnlike = await postToUnlike.populate('unlikes', 'avatar username');
    res.status(200).json({ message: 'Unlike updated successfully' });

  } catch (error) {
    return (res.status(400).json({ error: error.message }));
  }
};

module.exports = {
  createNewPost,
  getAllUserPosts,
  getSinglePost,
  editPost,
  deletePost,
  likeAPost,
  unlikeAPost
}