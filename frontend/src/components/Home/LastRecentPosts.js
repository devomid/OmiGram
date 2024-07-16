import React from 'react'
import PostsSkeleton from '../Skeleton/PostsSkeleton'
import { Stack } from '@mui/joy'

const LastRecentPosts = () => {
  return (
    <Stack>
      <PostsSkeleton />
    </Stack>
  )
}

export default LastRecentPosts