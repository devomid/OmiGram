import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Avatar, Box, Button, Dropdown, IconButton, Menu, MenuButton, MenuItem, Typography } from '@mui/joy';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeneralState } from '../../contexts/GeneralContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useReplyLikeAndUnlike } from '../../hooks/useReplyLikeAndUnlike';


const ReplyListItem = ({ reply, comment, setCommentModalOpen, replies }) => {
  const { user } = useAuthContext();
  const { likeAReply, unlikeAReply } = useReplyLikeAndUnlike();
  const [like, setLike] = useState(false);
  const [unlike, setUnlike] = useState(false);
  const { fetchReply, setFetchReply, commentOwnerUsername, setCommentOwnerUsername, commentOwner, setCommentOwner, commentId, setCommentId, isReply, setIsReply, openReplies, setOpenReplies, parentReply, setParentReply, replyLikeChange, setReplyLikeChange, replyUnlikeChange, setReplyUnlikeChange } = GeneralState();
  const navigate = useNavigate();

  const navigateToProfile = () => {
    setCommentModalOpen(false)
    navigate(`/${comment.commentWriter.username}`)
  };

  const replyHandler = () => {
    setIsReply(true);
    setCommentId(reply._id);
    setCommentOwner(reply.replyWriter._id);
    setCommentOwnerUsername(reply.replyWriter.username)
    setParentReply(reply._id)
  };

  const toggleReply = (replyId) => {
    setOpenReplies((prevState) => {
      const updatedOpenReplies = { ...prevState };
      updatedOpenReplies[replyId] = !prevState[replyId];
      return { ...updatedOpenReplies };
    });
  };

  const handleLike = async () => {
    await likeAReply(reply._id);
    setReplyLikeChange(!replyLikeChange);
    return
  };
  const handleUnLike = async () => {
    await unlikeAReply(reply._id);
    setReplyUnlikeChange(!replyUnlikeChange);
    return
  };

  useEffect(() => {
    if (reply.likes.length > 0) {
      reply.likes.map((like) => {
        if (like.username === user.user.username) {
          setLike(true)
        } else if (like === user.user._id) {
          setLike(true)
        } else {
          setLike(false)
        }
      });
    } else setLike(false)

    if (reply.unlikes.length > 0) {
      reply.unlikes.map((unlike) => {
        if (unlike.username === user.user.username) {
          setUnlike(true)
        } else if (unlike === user.user._id) {
          setUnlike(true)
        } else {
          setLike(false)
        }
      });
    } else setUnlike(false)
  }, [reply.likes, reply.unlikes]);


  return (
    <Box sx={{ /* cursor: 'pointer', */ minWidth: '300px', minHeight: '78px', mb: 1, ml: 2, borderRadius: 'xl', /* '&:hover': { bgcolor: '#38B2AC' }, */ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start', backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px) saturate(180%)', border: '1px solid rgba(209, 213, 219, 0.3)' }}>
      <Box sx={{ display: 'flex', width: '98%', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box onClick={navigateToProfile} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', }}>
          <Avatar color='primary' variant='plain' size='lg' src={reply.replyWriter.avatar} />
          <Typography level="title-md" ><b>{reply.replyWriter.username}</b></Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', m: 1 }}>
          <Button loading={false} variant='plain' color={like ? 'danger' : 'primary'} onClick={handleLike}>{like ? <Favorite /> : <FavoriteBorder />}</Button>
          <Button loading={false} variant='plain' color={unlike ? 'warning' : 'primary'} onClick={handleUnLike}>{unlike ? <HeartBrokenIcon /> : <HeartBrokenOutlinedIcon />}</Button>

          <Dropdown>
            <MenuButton slots={{ root: IconButton }} slotProps={{ root: { variant: 'plain', color: 'primary' } }}>
              <MoreVertOutlinedIcon />
            </MenuButton>
            {reply.replyWriter.username === user.user.username ? (
              <Menu sx={{ zIndex: 1300, backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px) saturate(180%)', border: '1px solid rgba(209, 213, 219, 0.3)' }} placement="bottom-end">
                <MenuItem /* onClick={handleEditClick} */>
                  <ModeEditOutlineOutlinedIcon />
                  <Typography sx={{ ml: 3, mr: 2 }}>Edit</Typography>
                </MenuItem>
                <MenuItem color='danger' /* onClick={handleDeleteClick} */>
                  <DeleteForeverOutlinedIcon />
                  <Typography color='danger' sx={{ ml: 3, mr: 2 }}>Delete</Typography>
                </MenuItem>
              </Menu>
            ) : (
              <Menu sx={{ zIndex: 1300, backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px) saturate(180%)', border: '1px solid rgba(209, 213, 219, 0.3)' }} placement="bottom-end">
                <MenuItem /* onClick={handleEditClick} */>
                  <ModeEditOutlineOutlinedIcon />
                  <Typography sx={{ ml: 3, mr: 2 }}>hi</Typography>
                </MenuItem>
                <MenuItem color='danger' /* onClick={handleDeleteClick} */>
                  <DeleteForeverOutlinedIcon />
                  <Typography color='danger' sx={{ ml: 3, mr: 2 }}>bye</Typography>
                </MenuItem>
              </Menu>
            )}
          </Dropdown >

        </Box>
      </Box>
      <Box sx={{ pr: 1, pl: 1 }}>
        <Typography sx={{ color: 'black' }} level="body-md" >{reply.replyBody}</Typography>
      </Box>
      <Box sx={{ display: 'flex', width: '98%', alignItems: 'center', justifyContent: 'space-between', mb: 1, ml: 1 }}>
        <Box>
          <Typography color='primary' level="body-xs">{formatDistanceToNow(new Date(comment.createdAt))}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mr: 2 }}>
          {reply.replyCount > 0 && (
            <Button onClick={() => { toggleReply(reply._id) }} variant="plain">
              <Typography color='primary.' level="body-xs" >
                {openReplies[reply._id] ? (
                  `Close replies`
                ) : (
                  `view ${reply.replyCount} replies`
                )}
              </Typography>
            </Button>
          )}
          <Button onClick={replyHandler} variant="plain">
            <Typography color='primary.' level="body-xs" >reply</Typography>
          </Button>
        </Box>
      </Box>
      {openReplies[reply._id] && (
        <Box sx={{ alignItems: 'flex-start', maxWidth: 410, mb: 1.5, pr: 1, textAlign: 'justify' }}>
          {replies && replies.map((replyToReply) => {
            if (replyToReply.parentReply && replyToReply.parentReply._id === reply._id) {
              return (
                <ReplyListItem reply={replyToReply} comment={comment} setCommentModalOpen={setCommentModalOpen} replies={replies} key={replyToReply._id} />
              );
            }
            return null;
          })}
        </Box>
      )}
    </Box>

  )
}

export default ReplyListItem