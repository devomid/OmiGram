import React from 'react'
import MessagesSkeleton from '../Skeleton/MessagesSkeleton'
import { Stack } from '@mui/joy'

const Messages = () => {
  return (
    <Stack>
      <MessagesSkeleton />
    </Stack>
  )
}

export default Messages