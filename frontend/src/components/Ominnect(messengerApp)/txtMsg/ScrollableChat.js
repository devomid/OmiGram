import { Avatar, Box, Tooltip, Typography } from '@mui/joy';
import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';
import { isLastMsg, isSameSender, isSameSenderMargin, isSameUser } from '../Utils/chatLogics';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';


const ScrollableChat = ({ msgs, isTyping }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  return (
    <Box sx={{ width: '100%', height: '100%', mr: 1 }}>
      <ScrollToBottom initialScrollBehavior='auto' debug='true' mode='bottom'>
        {msgs && msgs.map((msg, index) => (
          <div style={{ display: "flex" }} key={msg._id}>
            {(isSameSender(msgs, msg, index, user.user._id)
              || isLastMsg(msgs, index, user.user._id)
            ) && (
                <Box sx={{ m: 1, display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                  <Tooltip title={msg.sender.username} arrow placement='bottom-end'>
                    <Avatar size='sm' src={msg.sender.avatar} />
                  </Tooltip>
                </Box>
              )}
            <Box style={{ backgroundColor: `${msg.sender._id === user.user._id ? '#33b5ff' : '#1cff73'}`, borderRadius: 15, padding: '5px 15px', maxWidth: '75%', marginLeft: isSameSenderMargin(msgs, msg, index, user.user._id), marginTop: isSameUser(msgs, msg, index) ? 4 : 10 }}>
              {msg.chatPic ? (
                <Box sx={{ m: 1 }}>
                  <img onClick={() => window.open(msg.chatPic, 'rel=noopener noreferrer')} width="100%" height="auto" style={{ borderRadius: "1rem", cursor: 'pointer' }} src={msg.chatPic} />
                  <Typography>{msg.content}</Typography>
                </Box>
              ) : (
                <Typography>{msg.content}</Typography>
              )}
            </Box>
          </div>
        ))}
      </ScrollToBottom>
    </Box>
  )
}

export default ScrollableChat