const mongoose = require('mongoose');
const UserModel = require('../models/UserModel');
const PostModel = require('../models/PostModel');

const createNewPost = async (req, res) => {
  try {
    const { postBody, username, location, postPicture } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) return (res.status(404).json({ message: 'User not found.' }));

    const newPost = new PostModel({
      userId: user._id,
      author: user.username,
      postBody,
      likes: {},
      comments: [],
      location,
      postPicture,
      authorPicture: user.picture
    });

    await newPost.save();

    res.status(201).json(newPost);

  } catch (error) {
    return (res.status(400).json({ error: error.message }));
  };
};

const getUserFriends = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await UserModel.findById(id).populate('friends');

    // console.log("user from home controller: ", user);

    if (!user) return (res.status(404).json({ message: 'User not found.' }));
    // console.log(user);

    if (user.friends) {
      const friends = await Promise.all(
        user.friends.map((username) => {
          // console.log('username in friends map:', username);
          return UserModel.findOne({ username })
        })
      );
      const formattedFriends = friends.map(
        ({ _id, username, email, firstName, lastName, avatar, phoneNumber, birthDate, location }) => {
          return { _id, username, email, firstName, lastName, avatar, phoneNumber, birthDate, location };
        }
      );
      res.status(200).json(formattedFriends)
    } else {
      res.status(200).json({ message: 'This user has no friends.' });
    };

  } catch (error) {
    return (res.status(404).json({ error: error.message }));
  }
};

const getFriendsPosts = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await UserModel.findById(id).populate('friends');
    // console.log('user is:', user);

    if (!user) return res.status(404).json({ ok: false, message: 'User not found' });

    if (user.friends) {
      const friends = await Promise.all(
        user.friends.map((username) => {
          return UserModel.findOne({ username })
        })
      );
      // console.log('friends is:', friends);
      if (friends) {
        const friendsPosts = await Promise.all(
          friends.map((_id) => {
            return PostModel.find({ author: _id }).populate('author').sort({ createdAt: -1 })
          })
        );
        // console.log('friendsPosts is:', friendsPosts);
        (friendsPosts.length > 0) ? (
          res.status(200).json({ friendsPosts: friendsPosts })) : (
          res.status(404).json({ message: 'No posts yet' }))
      };
    } else {
      res.status(200).json({ message: 'This user has no friends.' });
    };

  } catch (error) {
    return (res.status(404).json({ error: error.message }));
  }
}

const getUserMessages = async (req, res) => { }

module.exports = {
  createNewPost,
  getUserFriends,
  getFriendsPosts,
  // getUserMessages,
};