import React from 'react'
import UsersSkeleton from '../Skeleton/UsersSkeleton'
import { Stack } from '@mui/joy'

const LastRecentUsers = () => {
  return (
    <Stack >
      <UsersSkeleton />
    </Stack>
  )
}

export default LastRecentUsers