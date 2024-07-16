import { Box, Skeleton, Stack } from '@mui/joy'
import React from 'react'

const ProfileOwnerInfoSkeleton = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Skeleton animation="wave" variant="circular" width={150} height={150} sx={{ mb: 2, mt: 3 }} />
      </Box>
      <Stack spacing={3} >
        <Skeleton animation="wave" variant="text" width={250} sx={{ fontSize: '1rem' }} />
        <Skeleton animation="wave" variant="text" width={250} sx={{ fontSize: '1rem' }} />
        <Skeleton animation="wave" variant="text" width={250} sx={{ fontSize: '1rem' }} />
        <Skeleton animation="wave" variant="text" width={250} sx={{ fontSize: '1rem' }} />
        <Skeleton animation="wave" variant="text" width={250} sx={{ fontSize: '1rem' }} />
        <Skeleton animation="wave" variant="text" width={250} sx={{ fontSize: '1rem' }} />
        <Skeleton animation="wave" variant="text" width={250} sx={{ fontSize: '1rem' }} />
      </Stack>
    </Box>
  )
}

export default ProfileOwnerInfoSkeleton