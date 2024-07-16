const express = require('express');
const verifyToken = require('../middlewares/verification');
const { postComment, getPostComments, postReply, getCommentReplies, likeAComment, unlikeAComment, likeAReply, unlikeAReply } = require('../controllers/commentController');

const router = express.Router();

router.post('/newcmnt', verifyToken, postComment);
router.get('/:postId', verifyToken, getPostComments);
router.post('/reply/:commentId', verifyToken, postReply);
router.get('/reply/:postId', verifyToken, getCommentReplies);
router.put('/like/:commentId', verifyToken, likeAComment);
router.put('/unlike/:commentId', verifyToken, unlikeAComment);
router.put('/reply/like/:replyId', verifyToken, likeAReply);
router.put('/reply/unlike/:replyId', verifyToken, unlikeAReply);

module.exports = router;