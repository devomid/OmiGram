import { Avatar, Box, Grid, Stack, Typography } from '@mui/joy'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const UserListItem = ({ user, open, setOpen }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    window.location.replace(`/${user.username}`);
    setOpen(false);
  }
  return (
    <Box onClick={handleClick} sx={{ width: '100%', mt: 0.6 }}>

      <Box sx={{ mr: 1, ml: 1, minWidth: '190px', minHeight: '78px', borderRadius: 'lg', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start', backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px) saturate(180%)', border: '1px solid rgba(50, 50, 50, 0.3)', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.5)' } }}>
        <Grid container spacing={3}>
          <Grid>
            <Box sx={{ ml: 1 }}>
              <Avatar variant='plain' color='primary' size='lg' src={user.avatar} ></Avatar>
            </Box>
          </Grid>

          <Grid>
            <Stack sx={{ alignItems: 'flex-start', p: 1 }}>
              <Typography><b>Username: </b>{user.username}</Typography>
              <Typography><b>Name: </b>{user.firstName} {user.lastName}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default UserListItem