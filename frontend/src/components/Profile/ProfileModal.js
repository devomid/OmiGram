import { Avatar, Box, Grid, IconButton, Modal, Sheet, Stack, Tooltip, Typography } from '@mui/joy';
import React from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';


const ProfileModal = ({ profileModalOpen, setProfileModalOpen }) => {
  const { user } = useAuthContext();

  return (
    <Box>
      <Modal aria-labelledby="modal-title" aria-describedby="modal-desc" open={profileModalOpen} onClose={() => setProfileModalOpen(false)} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <Sheet variant="solid" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 350, height: 350, maxWidth: 500, borderRadius: 'lg', p: 3, boxShadow: 'lg', backgroundColor: 'white' /* backgroundColor: 'rgba( 214, 164, 153, 0.3) ', backdropFilter:'saturate(80%)', border:'1px solid rgba( 255, 255, 255, 0.18 )' */ }}>
          <Stack>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
              <Avatar sx={{ width: 100, height: 100 }} src={user.user.avatar} variant='outlined' color='primary' />
            </Box>
            <Box >
              <Stack sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography level='h4'>Username: <Typography level='h5'>{user.user.username}</Typography></Typography>
                <Typography level='h4'>Name: <Typography level='h5'>{user.user.firstName} {user.user.lastName}</Typography></Typography>
                <Typography level='h4'>Email: <Typography level='h5'>{user.user.email}</Typography></Typography>
              </Stack>
            </Box>
            <Box sx={{ width: '100%', mt: 3 }}>
              <Grid container spacing={2} columns={18} sx={{ flexGrow: 1, mt: 1 }} alignItems='center' justifyContent='center'>
                <Tooltip title='See Profile' arrow color="neutral" placement="bottom" size="sm" variant="soft">
                  <Grid xs={6}><IconButton ><AccountBoxIcon /></IconButton></Grid>
                </Tooltip>
                <Tooltip title='Send a message' arrow color="neutral" placement="bottom" size="sm" variant="soft">
                  <Grid xs={6}><IconButton><LocalPostOfficeIcon /></IconButton></Grid>
                </Tooltip>
                <Tooltip title='Remove as friend' arrow color="neutral" placement="bottom" size="sm" variant="soft">
                  <Grid xs={6}><IconButton><PersonRemoveIcon /></IconButton></Grid>
                </Tooltip>
              </Grid>
            </Box>
          </Stack>
        </Sheet>
      </Modal>
    </Box>

  )
}

export default ProfileModal