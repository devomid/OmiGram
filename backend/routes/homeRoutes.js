const express = require('express');
const verifyToken = require('../middlewares/verification');
const { createNewPost, getUserFriends, getFriendsPosts } = require('../controllers/homeDataController')

const router = express.Router();

router.get('/', verifyToken, getUserFriends);
router.get('/posts', verifyToken, getFriendsPosts);
// router.post('/', verifyToken, createNewPost);
// router.get('/', verifyToken, getUserMessages);


module.exports = router;