import { Box, Skeleton, Stack } from '@mui/joy'
import React from 'react'

const PostsSkeleton = () => {
  return (
    <Stack spacing={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 0.5 }}>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
          <Skeleton animation="wave" variant="circular" width={40} height={40} sx={{ mb: 1 }} />
          <Skeleton animation="wave" variant="text" width={100} sx={{ fontSize: '1rem', ml: 1 }} />
        </Box>
        <Skeleton animation="wave" variant="rounded" width={250} height={100} />
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
          <Skeleton animation="wave" variant="circular" width={40} height={40} sx={{ mb: 1 }} />
          <Skeleton animation="wave" variant="text" width={100} sx={{ fontSize: '1rem', ml: 1 }} />
        </Box>
        <Skeleton animation="wave" variant="rounded" width={250} height={100} />
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
          <Skeleton animation="wave" variant="circular" width={40} height={40} sx={{ mb: 1 }} />
          <Skeleton animation="wave" variant="text" width={100} sx={{ fontSize: '1rem', ml: 1 }} />
        </Box>
        <Skeleton animation="wave" variant="rounded" width={250} height={100} />
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
          <Skeleton animation="wave" variant="circular" width={40} height={40} sx={{ mb: 1 }} />
          <Skeleton animation="wave" variant="text" width={100} sx={{ fontSize: '1rem', ml: 1 }} />
        </Box>
        <Skeleton animation="wave" variant="rounded" width={250} height={100} />
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
          <Skeleton animation="wave" variant="circular" width={40} height={40} sx={{ mb: 1 }} />
          <Skeleton animation="wave" variant="text" width={100} sx={{ fontSize: '1rem', ml: 1 }} />
        </Box>
        <Skeleton animation="wave" variant="rounded" width={250} height={100} />
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
          <Skeleton animation="wave" variant="circular" width={40} height={40} sx={{ mb: 1 }} />
          <Skeleton animation="wave" variant="text" width={100} sx={{ fontSize: '1rem', ml: 1 }} />
        </Box>
        <Skeleton animation="wave" variant="rounded" width={250} height={100} />
      </Box>
    </Stack>
  )
}

export default PostsSkeleton