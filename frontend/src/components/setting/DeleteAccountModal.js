import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog } from '@mui/joy';
import React from 'react';


const DeleteAccountModal = ({ deleteAccountModal, setDeleteAccountModal }) => {

  return (
    <Modal open={deleteAccountModal} onClose={() => setDeleteAccountModal(false)}>
      <ModalDialog variant="outlined" role="alertdialog" sx={{ backgroundColor: 'rgba(255, 0, 0, 0.3)', backdropFilter: 'blur(20px) saturate(180%)', border: '1px solid rgba(50, 50, 50, 0.3)' }}>
        <DialogTitle sx={{ color: 'white' }}><WarningRoundedIcon />Confirmation</DialogTitle>
        <Divider />
        <DialogContent sx={{ color: 'white' }}>Are you sure you want to completley delete your account?</DialogContent>
        <DialogActions>
          <Button variant="solid" color="danger" onClick={() => setDeleteAccountModal(false)}>Delete account</Button>
          <Button variant="plain" color="neutral" onClick={() => setDeleteAccountModal(false)}>Cancel</Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  )
}

export default DeleteAccountModal