import { Box, Grid, Modal, Sheet, Tab, TabList, TabPanel, Tabs, Typography } from '@mui/joy';
import { tabClasses } from '@mui/joy/Tab';
import React, { useState } from 'react';
import AccountInformationTab from './AccountInformationTab';
import AccountSecurityTab from './AccountSecurityTab';
import DeleteAccountModal from './DeleteAccountModal';
import DeleteAccountTab from './DeleteAccountTab';
import PersonalInformationTab from './PersonalInformationTab';


const SettingModal = ({ settingModalOpen, setSettingModalOpen }) => {
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Box>
      <Modal open={settingModalOpen} onClose={() => setSettingModalOpen(false)} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <Sheet variant="solid" sx={{ display: 'flex', justifyContent: 'start', alignItems: 'flex-start', width: 750, height: 650, maxWidth: 800, borderRadius: 'lg', p: 3, boxShadow: 'lg', backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(20px) saturate(180%)', border: '1px solid rgba(50, 50, 50, 0.3)' }}>
          <Box>
            <Tabs orientation="vertical" sx={{ "--Tab-indicatorThickness": "0px", background: 'none' }} >
              <Grid container spacing={2} columns={18} >
                <Grid xs={6}>
                  <TabList sx={{ height: 650, width: 230, p: 1, gap: 4, borderRadius: 'xl', bgcolor: 'rgba(255, 255, 255, 0.5)', [`& .${tabClasses.root}[aria-selected="true"]`]: { boxShadow: 'sm', bgcolor: 'background.surface' } }}>
                    <Tab><Typography>Personal information</Typography></Tab>
                    <Tab><Typography>Account information</Typography></Tab>
                    <Tab><Typography>Account security</Typography></Tab>
                    <Tab><Typography color='danger'>Delete account</Typography></Tab>
                    <Tab><Typography>About</Typography></Tab>
                  </TabList>
                </Grid>

                <Grid xs={12}>
                  <TabPanel value={0}>
                    <Grid container spacing={2} columns={18}>
                      <PersonalInformationTab setSettingModalOpen={setSettingModalOpen} />
                    </Grid>

                  </TabPanel>
                  <TabPanel value={1}>
                    <Grid container spacing={2} columns={18}>
                      <AccountInformationTab setSettingModalOpen={setSettingModalOpen} />
                    </Grid>

                  </TabPanel>
                  <TabPanel value={2}>
                    <Grid container spacing={2} columns={18}>
                      <AccountSecurityTab setSettingModalOpen={setSettingModalOpen} />
                    </Grid>

                  </TabPanel>
                  <TabPanel value={3}>
                    <Grid container spacing={2} columns={18}>
                      <DeleteAccountTab setSettingModalOpen={setSettingModalOpen} />
                    </Grid>

                  </TabPanel>

                  <TabPanel value={4}>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi suscipit excepturi expedita, inventore voluptatem iste rem minus ullam officia quod magnam amet. Commodi odit ex officia consequuntur debitis, quod similique?
                    </Typography>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi suscipit excepturi expedita, inventore voluptatem iste rem minus ullam officia quod magnam amet. Commodi odit ex officia consequuntur debitis, quod similique?
                    </Typography>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi suscipit excepturi expedita, inventore voluptatem iste rem minus ullam officia quod magnam amet. Commodi odit ex officia consequuntur debitis, quod similique?
                    </Typography>
                  </TabPanel>
                </Grid>
              </Grid>
            </Tabs>
          </Box>
          <DeleteAccountModal deleteAccountModal={deleteAccountModal} setDeleteAccountModal={setDeleteAccountModal} />
        </Sheet >
      </Modal >
    </Box >

  )
}

export default SettingModal