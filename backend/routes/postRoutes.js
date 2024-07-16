const express = require('express');
const verifyToken = require('../middlewares/verification');
const { createNewPost, getAllUserPosts, getSinglePost, editPost, deletePost, likeAPost, unlikeAPost } = require('../controllers/postsController');

const router = express.Router();

router.post('/', verifyToken, createNewPost);
router.get('/:username', verifyToken, getAllUserPosts);
router.get('/:postId', verifyToken, getSinglePost);
router.patch('/:postId', verifyToken, editPost);
router.delete('/:postId', verifyToken, deletePost);
router.put('/like/:postId', verifyToken, likeAPost);
router.put('/unlike/:postId', verifyToken, unlikeAPost);

module.exports = router;