import { Box, Typography } from '@mui/joy'
import React from 'react'

const PostListItemSmall = ({ profileOwner, post }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', minWidth: '200px', minHeight: '70px', justifyContent: 'start', alignItems: 'center', borderRadius: 'lg', m: 1, p: 0.5, backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(20px) saturate(180%)', border: '1px solid rgba(50, 50, 50, 0.3)' }}>
        <Box>
          <img width="53px" height="53px" style={{ objectFit: 'cover', borderRadius: "10px", border: '1px solid rgba(209, 213, 219, 0.3)' }} src={post.postPicture} />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Typography sx={{ ml: 1, textAlign: 'left', overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical" }} >{post.postBody}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default PostListItemSmall