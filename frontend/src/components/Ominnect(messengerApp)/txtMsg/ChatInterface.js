import { Box } from '@mui/joy';
import React from 'react';
import PuffLoader from "react-spinners/PuffLoader";
import ScrollableChat from './ScrollableChat';


const ChatInterface = ({ msgs, isLoading, isTyping }) => {

  return (
    <>
      <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
        {isLoading ? (
          <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <PuffLoader color="#6e3e8e" size={140} cssOverride={null} speedMultiplier={1} />
          </Box>
        ) : (
          <ScrollableChat msgs={msgs} isTyping={isTyping} />
        )}
      </Box>

    </>
  )
};

export default ChatInterface;