import { Avatar, Box, Stack, Typography } from '@mui/joy'
import React from 'react'
import moment from 'moment';


const ProfileOwnerInfo = ({ profileOwner }) => {
  const birthDate = moment(profileOwner.birthDate).format('MMMM Do YYYY')
  return (
    <Box >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Avatar sx={{ width: 150, height: 150 }} color="primary" size="lg" variant="plain" src={profileOwner.avatar} />
      </Box>
      <Stack spacing={2}>
        <Typography><b>Username: </b>{profileOwner.username}</Typography>
        <Typography><b>Name: </b>{profileOwner.firstName} {profileOwner.lastName}</Typography>
        <Typography><b>Date of Birth: </b>{birthDate}</Typography>
        <Typography><b>Bio: </b>{profileOwner.bio}</Typography>
        <Typography><b>City: </b>{profileOwner.city}</Typography>
        <Typography><b>occupation: </b>{profileOwner.occupation}</Typography>
        <Typography><b>education: </b>{profileOwner.education}</Typography>
      </Stack>
    </Box>
  )
}

export default ProfileOwnerInfo