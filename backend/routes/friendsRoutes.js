const express = require('express');
const { getUserFriends, addOrRemoveFriend, removeFriend, getUser } = require('../controllers/userController');
const verifyToken = require('../middlewares/verification');

const router = express.Router();

router.get('/', verifyToken, getUserFriends);
router.patch('/add/:friend', addOrRemoveFriend);
router.delete('/remove/:friend', verifyToken, removeFriend);
router.get('/:username', verifyToken, getUser)

module.exports = router