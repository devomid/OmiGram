const ChatModel = require('../models/ChatModel');
const UserModel = require('../models/UserModel');

const accessChat = async (req, res) => {
  const { receiverId } = req.body
  if (!receiverId) {
    console.log('UserId not exists');

  }

  var chat = await ChatModel.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: receiverId } } }
    ],
  }).populate('users', '-password')
    .populate('latestMessage');


  chat = await UserModel.populate(chat, {
    path: 'latestMessage.sender',
    select: 'username firstName lastName avatar email'
  });


  if (chat.length > 0) {
    res.send(chat[0]);
  } else {
    var chatData = {
      chatName: 'sender',
      isGroupChat: false,
      users: [req.user._id, receiverId]
    };
    try {
      const newChat = await ChatModel.create(chatData)
      const FullChat = await ChatModel.findOne({ _id: newChat._id })
        .populate('users', '-password');
      res.status(200).send(FullChat);

    } catch (error) {
      console.log('error from new chat in controller', error);
    }
  }
};

const fetchChats = async (req, res) => {
  try {
    ChatModel.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
      .populate('latestMessage')
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await UserModel.populate(results, {
          path: 'latestMessage.sender',
          select: 'username firstName lastName avatar email'
        });

        res.status(200).send(results);
      });

  } catch (error) {
    console.log('error from fetcChats in chat controller:', error);
  }
};

const createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  };
  let users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  };
  users.push(req.user);

  try {
    const groupChat = await ChatModel.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user
    });

    const fullGroupChat = await ChatModel.findOne({ _id: groupChat._id })
      .populate('users', '-password')
      .populate('groupAdmin', '-password');

    res.status(200).json(fullGroupChat);

  } catch (error) {
    console.log('error from new group chat in chat controller:', error);
  }
};

const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  try {
    const updatedChat = await ChatModel.findByIdAndUpdate(chatId, { chatName }, { new: true })
      .populate('users', '-password')
      .populate('groupAdmin', '-password');

    if (!updatedChat) {
      res.status(404);
      throw new Error('chat not found');
    } else {
      res.status(200).json(updatedChat)
    }

  } catch (error) {
    console.log('error in rename group in chat controller: ', error);
  };
};

const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;
  try {
    const added = await ChatModel.findByIdAndUpdate(chatId, {
      $push: { users: userId }
    }, { new: true })
      .populate('users', '-password')
      .populate('groupAdmin', '-password');

    if (!added) {
      res.status(404);
      throw new Error('chat not found');
    } else {
      res.status(200).json(added)
    }

  } catch (error) {
    console.log('error in add to group in chat controller: ', error);
  }
}

const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;
  try {
    const removed = await ChatModel.findByIdAndUpdate(chatId, {
      $pull: { users: userId }
    }, { new: true })
      .populate('users', '-password')
      .populate('groupAdmin', '-password');

    if (!removed) {
      res.status(404);
      throw new Error('chat not found');
    } else {
      res.status(200).json(removed)
    }

  } catch (error) {
    console.log('error in add to group in chat controller: ', error);
  }
}

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup
};