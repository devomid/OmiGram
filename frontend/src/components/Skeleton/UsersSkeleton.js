import { Box, Skeleton, Stack } from '@mui/joy'
import React from 'react'

const UsersSkeleton = () => {
  return (
    <Stack spacing={2} sx={{ mt: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rounded" width={210} height={60} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', mt: 2 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rounded" width={210} height={60} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', mt: 2 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rounded" width={210} height={60} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', mt: 2 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rounded" width={210} height={60} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', mt: 2 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rounded" width={210} height={60} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', mt: 2 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rounded" width={210} height={60} />
      </Box>
    </Stack>
  )
}

export default UsersSkeleton