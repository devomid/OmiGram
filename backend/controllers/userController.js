const { default: mongoose } = require('mongoose');
const UserModel = require('../models/UserModel');

const fuck = (req, res) => {
  console.log('in fuck')
  res.send('this is it')
}


/* GET USER */
const getUser = async (req, res) => {
  try {
    const username = req.params.username;
    // console.log(username);
    const user = await UserModel.findOne(username);

    user ? (
      res.status(200).json(user)) : (
      res.status(404).json({ message: 'User not found' }));

  } catch (error) {
    return (res.status(400).json({ error: error.message }));
  };
};

/* GET USER'S FRIENDS */
const getUserFriends = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await UserModel.findOne({ username });
    if (!user) return (res.status(404).json({ message: 'User not found.' }));

    const friends = await Promise.all(
      user.friends.map((friendId) => UserModel.findById(friendId))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picture, birthDate, city, status, bio, username }) => {
        return { _id, firstName, lastName, occupation, location, picture, birthDate, city, status, bio, username };
      }
    );

    formattedFriends ? (
      res.status(200).json(formattedFriends)) : (
      res.status(404).json({ message: 'Friends not found' }));

  } catch (error) {
    return (res.status(404).json({ error: error.message }));
  }
};


/* UPDATE A USER */
const editUser = async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  try {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ error: 'Invalid post' })
    };

    const userToUpdate = await UserModel.findByIdAndUpdate({ _id: userId }, { ...req.body }, { new: true, select: '-password' });

    userToUpdate ? (
      res.status(200).json({ user: userToUpdate, message: 'User Updated Successfully!' })) : (
      res.status(404).json({ message: 'User not found' }));

  } catch (error) {
    return (res.status(404).json({ error: error.message }));
  }
};

/* DELETE A USER */
const deleteUser = async (req, res) => {
  try {
    const username = req.params.username;

    const userId = req.user._id.toString();
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ error: 'Invalid post' })
    };

    const userToDelete = await UserModel.findByIdAndDelete({ _id: userId, username: username });

    userToDelete ? (
      res.status(200).json(userToDelete)) : (
      res.status(404).json({ message: 'User not found' }));

  } catch (error) {
    return (res.status(404).json({ error: error.message }));
  }
};

// /* ADD OR REMOVE A FRIEND */
const addOrRemoveFriend = async (req, res) => {

  try {
    const username = req.body.username;
    const friendUsername = req.params.friend;
    if (!username || !friendUsername) {
      return (res.status(404).json({ message: 'User not found' }));
    };

    const user = await UserModel.findOne({ username });
    const friend = await UserModel.findOne({ username: friendUsername });
    let friends = user.friends;

    if (!user) {
      return (res.status(404).json({ message: 'User not found!!' }));
    };
    if (!friend) {
      return (res.status(404).json({ message: 'Friend not found!!' }));
    };

    if (friends.includes(friend.username)) {
      friends = friends.filter((friend) => friend != friendUsername);
      user.friends = friends;
      await user.save();
      res.status(200).json({ message: 'You lost a friend!' });

    } else {
      user.friends.push(friendUsername);
      await user.save();
      res.status(200).json({ message: 'You have a new friend!' });
    }

  } catch (error) {
    return (res.status(404).json({ error: error.message }));
  };
};

const removeFriend = async (req, res) => {
  try {
    const username = req.params.username;
    const friendUsername = req.params.friendUsername;
    if (!username || !friendUsername) {
      return (res.status(404).json({ message: 'User not found' }));
    };

    const user = await UserModel.findOne({ username });
    const friend = await UserModel.findOne({ friendUsername });
    if (!user || !friend) {
      return (res.status(404).json({ message: 'User not found' }));
    };

    user.friends.filter((username) => username !== friendUsername);
    await user.save()

    res.status(200).json({ message: 'Friend removed successfully' });

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath, birthDate, city, status, bio }) => {
        return { _id, firstName, lastName, occupation, location, picture, birthDate, city, status, bio };
      }
    );
    res.status(200).json({ formattedFriends });

  } catch (error) {
    return (res.status(404).json({ error: error.message }));
  }
}

//SEARCH USER
const searchAllUsers = async (req, res) => {
  // console.log('searching...');
  const keyword = req.query.search ? {
    $or: [
      { name: { $regex: req.query.search, $options: "i" } },
      { email: { $regex: req.query.search, $options: "i" } },
    ]
  } : {};

  const users = await UserModel.find(keyword).find({ _id: { $ne: req.user._id } });
  users ? (
    res.status(200).json(users)) : (
    res.status(404).json({ message: 'User not found' }));
};


module.exports = {
  getUser,
  getUserFriends,
  editUser,
  deleteUser,
  addOrRemoveFriend,
  removeFriend,
  searchAllUsers,
  fuck
}





