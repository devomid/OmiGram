const express = require('express');
const verifyToken = require('../middlewares/verification');
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require('../controllers/chatController');

const router = express.Router();

router.post('/', verifyToken, accessChat);
router.get('/', verifyToken, fetchChats);
router.post('/group', verifyToken, createGroupChat);
router.put('/rename', verifyToken, renameGroup);
router.put('/groupadd', verifyToken, addToGroup);
router.put('/groupremove', verifyToken, removeFromGroup);

module.exports = router;