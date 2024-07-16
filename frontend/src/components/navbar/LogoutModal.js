import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog } from '@mui/joy';
import React from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';


const LogoutModal = ({ logoutModal, setLogoutModal, handleLogout }) => {
  const { user } = useAuthContext();


  return (
    <Modal open={logoutModal} onClose={() => setLogoutModal(false)} >
      <ModalDialog variant="outlined" role="alertdialog" sx={{ backgroundColor: 'rgba(255, 0, 0, 0.3)', backdropFilter: 'blur(20px) saturate(180%)', border: '1px solid rgba(50, 50, 50, 0.3)' }}>
        <DialogTitle sx={{ color: 'yellow' }}><WarningRoundedIcon sx={{ color: 'yellow' }} />Log Out Confirmation</DialogTitle>
        <Divider />
        <DialogContent sx={{ color: 'black' }}><b>{user.user.firstName}</b> Are you sure you want to log out of your account?</DialogContent>
        <DialogActions>
          <Button variant="soft" color="danger" onClick={handleLogout}>Logout</Button>
          <Button variant="outlined" color="neutral[100]" onClick={() => setLogoutModal(false)}>Cancel</Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  )
}

export default LogoutModal