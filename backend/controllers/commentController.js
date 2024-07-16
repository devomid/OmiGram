const { default: mongoose } = require('mongoose');
const CommentModel = require('../models/CommentModel');
const PostModel = require('../models/PostModel');
const ReplyModel = require('../models/ReplyModel');
const UserModel = require('../models/UserModel');

const postComment = async (req, res) => {
  const { post, commentBody } = req.body;
  const userId = req.user._id;

  const newComment = {
    parentPost: post,
    commentWriter: userId,
    commentBody,
  };

  try {
    let theComment = await CommentModel.create(newComment);
    theComment = await theComment.populate('parentPost');
    // theComment = await theComment.populate('comment');
    theComment = await theComment.populate('commentWriter', 'username avatar');

    res.status(201).json(theComment)

  } catch (error) {
    console.log('error from newComment in controller', error);
  }
};

const postReply = async (req, res) => {
  const { post, commentOwner, replyBody, parentReply } = req.body;
  const userId = req.user._id;
  const { commentId } = req.params;
  const newReply = {
    parentPost: post,
    replyWriter: userId,
    replyBody,
    parentComment: commentId,
    commentOwner
  };
  if (parentReply) {
    newReply.parentReply = parentReply
  }

  try {
    let theReply = await ReplyModel.create(newReply);

    const populateFields = [
      { path: 'parentPost' },
      { path: 'parentComment' },
      { path: 'replyWriter', select: 'username avatar' },
      { path: 'commentOwner', select: 'username avatar' }
    ];

    if (parentReply) {
      populateFields.push({ path: 'parentReply' });
      await ReplyModel.findByIdAndUpdate(commentId, { $inc: { replyCount: 1 } });
    };

    theReply = await theReply.populate(populateFields)

    await CommentModel.findByIdAndUpdate(commentId, { $inc: { replyCount: 1 } });

    res.status(201).json(theReply);

  } catch (error) {
    console.log('error from newReply in controller', error);
  };
};

const getPostComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await CommentModel.find({ parentPost: postId })
      // .populate('comment')
      .populate('parentPost')
      .populate('commentWriter', 'username avatar')

    res.status(200).json(comments);
  } catch (error) {
    console.log('error from fetchComment in controller', error);
  }
};

const getCommentReplies = async (req, res) => {
  const { postId } = req.params;
  // console.log(postId);
  try {
    let query = ReplyModel.find({ parentPost: postId })
      .populate('parentComment')
      .populate('parentPost')
      .populate('replyWriter', 'avatar username')
      .populate('commentOwner', 'username avatar');

    const replies = await query.lean();

    // Check if 'parentReply' field is present and populate it if not null
    const populatedReplies = replies.map(async (reply) => {
      if (reply.parentReply) {
        const populatedReply = await ReplyModel.populate(reply, 'parentReply');
        return populatedReply;
      }
      return reply;
    });

    const finalReplies = await Promise.all(populatedReplies);

    res.status(200).json(finalReplies);
  } catch (error) {
    console.log('error from fetchReplies in controller', error);
  };
};

const likeAComment = async (req, res) => {
  const userId = req.body._id;
  const { commentId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(404).json({ error: 'Post not found' })
  };

  try {
    let commentToLike = await CommentModel.findById(commentId);

    if (!commentToLike) {
      res.status(404).json({ message: 'Comment not found' });
    };
    const UnlikeruserIndex = commentToLike.unlikes.indexOf(userId);
    const likeruserIndex = commentToLike.likes.indexOf(userId);

    if (likeruserIndex > -1) {
      commentToLike.likes.splice(likeruserIndex, 1);
    } else {
      if (UnlikeruserIndex > -1) {
        commentToLike.unlikes.splice(UnlikeruserIndex, 1);
      }
      commentToLike.likes.push(userId);
    }
    await commentToLike.save();
    commentToLike = await commentToLike.populate('likes', 'avatar username');
    res.status(200).json(commentToLike);

  } catch (error) {
    return (res.status(400).json({ error: error.message }));
  }
};

const unlikeAComment = async (req, res) => {
  const userId = req.body._id;
  const { commentId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(404).json({ error: 'Post not found' })
  };

  try {
    let commentToUnlike = await CommentModel.findById(commentId);

    if (!commentToUnlike) {
      res.status(404).json({ message: 'Comment not found' });
    };
    const UnlikeruserIndex = commentToUnlike.unlikes.indexOf(userId);
    const likeruserIndex = commentToUnlike.likes.indexOf(userId);

    if (UnlikeruserIndex > -1) {
      commentToUnlike.unlikes.splice(UnlikeruserIndex, 1);
    } else {
      if (likeruserIndex > -1) {
        commentToUnlike.likes.splice(likeruserIndex, 1);
      }
      commentToUnlike.unlikes.push(userId);
    }
    await commentToUnlike.save();
    commentToUnlike = await commentToUnlike.populate('unlikes', 'avatar username');
    res.status(200).json(commentToUnlike);

  } catch (error) {
    return (res.status(400).json({ error: error.message }));
  }
};

const likeAReply = async (req, res) => {
  const userId = req.body._id;
  const { replyId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(replyId)) {
    return res.status(404).json({ error: 'Post not found' })
  };

  try {
    let replyToLike = await ReplyModel.findById(replyId);

    if (!replyToLike) {
      res.status(404).json({ message: 'Reply not found' });
    };
    const UnlikeruserIndex = replyToLike.unlikes.indexOf(userId);
    const likeruserIndex = replyToLike.likes.indexOf(userId);

    if (likeruserIndex > -1) {
      replyToLike.likes.splice(likeruserIndex, 1);
    } else {
      if (UnlikeruserIndex > -1) {
        replyToLike.unlikes.splice(UnlikeruserIndex, 1);
      }
      replyToLike.likes.push(userId);
    }
    await replyToLike.save();
    replyToLike = await replyToLike.populate('likes', 'avatar username');
    res.status(200).json(replyToLike);

  } catch (error) {
    return (res.status(400).json({ error: error.message }));
  }
};

const unlikeAReply = async (req, res) => {
  const userId = req.body._id;
  const { replyId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(replyId)) {
    return res.status(404).json({ error: 'Post not found' })
  };

  try {
    let replyToUnlike = await ReplyModel.findById(replyId);

    if (!replyToUnlike) {
      res.status(404).json({ message: 'Comment not found' });
    };
    const UnlikeruserIndex = replyToUnlike.unlikes.indexOf(userId);
    const likeruserIndex = replyToUnlike.likes.indexOf(userId);

    if (UnlikeruserIndex > -1) {
      replyToUnlike.unlikes.splice(UnlikeruserIndex, 1);
    } else {
      if (likeruserIndex > -1) {
        replyToUnlike.likes.splice(likeruserIndex, 1);
      }
      replyToUnlike.unlikes.push(userId);
    }
    await replyToUnlike.save();
    replyToUnlike = await replyToUnlike.populate('unlikes', 'avatar username');
    res.status(200).json(replyToUnlike);

  } catch (error) {
    return (res.status(400).json({ error: error.message }));
  }
};

module.exports = {
  postComment,
  getPostComments,
  postReply,
  getCommentReplies,
  likeAComment,
  unlikeAComment,
  likeAReply,
  unlikeAReply
}