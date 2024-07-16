import { Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog, Typography } from '@mui/joy'
import React from 'react'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { GeneralState } from '../../contexts/GeneralContext';
import { useAuthContext } from '../../hooks/useAuthContext';


const LeaveGroupModal = ({ leaveGroupModal, setLeaveGroupModal, setFetchAgain, setGroupInfoModal, removeUserFromGroup }) => {
  const { user } = useAuthContext();
  const { selectedChat, setSelectedChat } = GeneralState();
  const config = { headers: { Authorization: `Bearer ${user.token}` } };

  const handleLeaveGroup = () => {
    removeUserFromGroup(selectedChat._id, user.user._id, config)
    setSelectedChat();
    setFetchAgain(!setFetchAgain);
    setLeaveGroupModal(false);
    setGroupInfoModal(false)
  };

  return (
    <Modal open={leaveGroupModal} onClose={() => setLeaveGroupModal(false)}>
      <ModalDialog variant="outlined" role="alertdialog" sx={{ backgroundColor: 'rgba(255, 0, 0, 0.3)', backdropFilter: 'blur(20px) saturate(180%)', border: '1px solid rgba(50, 50, 50, 0.3)' }} >
        <DialogTitle ><WarningRoundedIcon sx={{ color: 'white' }} /><Typography sx={{ color: 'white' }}>Confirmation</Typography></DialogTitle>
        <Divider />
        <DialogContent>
          <Typography sx={{ color: 'white' }}>Are you sure you want to leave this group?</Typography>
          <Typography sx={{ color: 'white' }}>This will entirly delete the group.</Typography>
        </DialogContent>
        <DialogActions>
          <Button /* loading={isLoading} */ loadingPosition="end" variant="solid" color="danger" onClick={handleLeaveGroup}>
            Remove Yourself
          </Button>
          <Button variant="outlined" color="neutral[100]" onClick={() => setLeaveGroupModal(false)}>
            Cancel
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal >
  )
}

export default LeaveGroupModal