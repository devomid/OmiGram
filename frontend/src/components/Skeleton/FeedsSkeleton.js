import { Box, Skeleton, Stack } from '@mui/joy'
import React from 'react'

const FeedsSkeleton = () => {
  return (
    <Stack spacing={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 0.5 }}>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
          <Skeleton animation="wave" variant="circular" width={80} height={80} sx={{ mb: 1 }} />
          <Skeleton animation="wave" variant="text" width={200} sx={{ fontSize: '3rem', ml: 1 }} />
        </Box>
        <Skeleton animation="wave" variant="rounded" width={550} height={350} />
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
          <Skeleton animation="wave" variant="circular" width={80} height={80} sx={{ mb: 1 }} />
          <Skeleton animation="wave" variant="text" width={200} sx={{ fontSize: '3rem', ml: 1 }} />
        </Box>
        <Skeleton animation="wave" variant="rounded" width={550} height={350} />
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
          <Skeleton animation="wave" variant="circular" width={80} height={80} sx={{ mb: 1 }} />
          <Skeleton animation="wave" variant="text" width={200} sx={{ fontSize: '3rem', ml: 1 }} />
        </Box>
        <Skeleton animation="wave" variant="rounded" width={550} height={350} />
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
          <Skeleton animation="wave" variant="circular" width={80} height={80} sx={{ mb: 1 }} />
          <Skeleton animation="wave" variant="text" width={200} sx={{ fontSize: '3rem', ml: 1 }} />
        </Box>
        <Skeleton animation="wave" variant="rounded" width={550} height={350} />
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
          <Skeleton animation="wave" variant="circular" width={80} height={80} sx={{ mb: 1 }} />
          <Skeleton animation="wave" variant="text" width={200} sx={{ fontSize: '3rem', ml: 1 }} />
        </Box>
        <Skeleton animation="wave" variant="rounded" width={550} height={350} />
      </Box>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
          <Skeleton animation="wave" variant="circular" width={80} height={80} sx={{ mb: 1 }} />
          <Skeleton animation="wave" variant="text" width={200} sx={{ fontSize: '3rem', ml: 1 }} />
        </Box>
        <Skeleton animation="wave" variant="rounded" width={550} height={350} />
      </Box>

    </Stack>
  )
}

export default FeedsSkeleton