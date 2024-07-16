import { Avatar, Box, IconButton, Stack, Tooltip, Typography } from '@mui/joy';
import React from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

const VoiceRoom = () => {
  const { user } = useAuthContext();
  return (
    <Box>
      <Stack>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 5, mt: 5 }}>
          <Avatar sx={{ width: 150, height: 150 }} src={user.avatar} variant='outlined' color='primary' />
        </Box>
        <Box >
          <Stack sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography sx={{ mb: 1 }} level='h4'>Name: <Typography level='body-Olg'>{user.firstName} {user.lastName}</Typography></Typography>
            <Typography level='h4'>Username: <Typography level='body-lg'>{user.username}</Typography></Typography>
            <Typography sx={{ mt: 1 }} level='h4'>Email: <Typography level='body-lg'>{user.email}</Typography></Typography>
          </Stack>
        </Box>
        <Box sx={{ width: '100%', mt: 8, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <Tooltip title='See Profile' arrow color="neutral" placement="bottom" size="sm" variant="soft">
            <IconButton ><AccountBoxIcon fontSize='large' /></IconButton>
          </Tooltip>
          <Tooltip title='Voice call' arrow color="neutral" placement="bottom" size="sm" variant="soft">
            <IconButton><CallRoundedIcon fontSize='large' /></IconButton>
          </Tooltip>
          <Tooltip title='Remove as friend' arrow color="neutral" placement="bottom" size="sm" variant="soft">
            <IconButton><PersonRemoveIcon fontSize='large' /></IconButton>
          </Tooltip>
        </Box>
      </Stack>
    </Box>
  )
}

export default VoiceRoom