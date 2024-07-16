const mongoose = require('mongoose');
const UserModel = require('../models/UserModel');
const PostModel = require('../models/PostModel');
const MessageModel = require('../models/MessageModel');
const ChatModel = require('../models/ChatModel');
const formidable = require('formidable');
const cloudinary = require('cloudinary');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config()

const sendMsgWithPic = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
  });

  const form = new formidable.IncomingForm();
  const uploadsFolder = path.join(__dirname, '../public/uploads/messages');

  form.multiples = true;
  form.maxFileSize = 50 * 1024 * 1024; //50 MB
  form.uploadDir = uploadsFolder;

  form.parse(req, async (error, fields, files) => {
    try {
      const { userId } = req.params;
      const file = files.chatPic;
      const content = fields.content[0]
      const chatId = fields.chatId[0];
      // console.log('file:', file);
      // console.log('content:', content);
      // console.log('chatId:', chatId);
      // console.log('userId', userId);

      if (file && file.length > 0) {
        const filePath = file[0].filepath;
        const cloudinaryResult = await cloudinary.v2.uploader.upload(filePath);
        const cloudinaryURL = cloudinaryResult.secure_url
        var chatPicPath = cloudinaryURL
        // console.log(filePath);

      } else if (files.files instanceof Array && files.files.length > 0) {
        return

      } else {
        return res.json({ ok: false, msg: 'No files uploaded' });
      };

      const newMsg = {
        sender: userId,
        content: content,
        chat: chatId,
        chatPic: chatPicPath
      };

      let message = await MessageModel.create(newMsg);

      message = await message.populate("sender", "username avatar")
      message = await message.populate("chat")
      message = await UserModel.populate(message, {
        path: "chat.users",
        select: "username avatar firstName lastName"
      });

      await ChatModel.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

      res.status(201).json(message);

    } catch (error) {
      console.log('error from msgController and newMsg', error);
    }
  })
}

const sendMsg = async (req, res) => {
  const { content, chatId, post } = req.body;
  if (!content || !chatId) {
    console.log('Invalid data passed into request');
    return res.sendStatus(400)
  };
  const newMsg = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  if (post) {
    newMsg.post = post;
  };


  try {
    let message = await MessageModel.create(newMsg);

    message = await message.populate("sender", "username avatar")
    message = await message.populate("chat")
    message = await message.populate("post")
    message = await UserModel.populate(message, {
      path: "chat.users",
      select: "username avatar firstName lastName"
    });

    await ChatModel.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    console.log('error from msgController and newMsg', error);
  };
};

const allMsgs = async (req, res) => {
  try {
    const messages = await MessageModel.find({ chat: req.params.chatId })
      .populate("sender", "username avatar firstName lastName")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    console.log('error from msgController and allMsgs', error);
  };
};

module.exports = {
  sendMsgWithPic,
  sendMsg,
  allMsgs
};