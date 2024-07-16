import { Box, Button, FormControl, FormHelperText, FormLabel, Grid, Input } from '@mui/joy';
import { useFormik } from 'formik';
import React from 'react';
import { UserEditAccountInfoValidation } from '../../validation/yupUserSchema';
import axios from 'axios';


const AccountInformationTab = ({ setSettingModalOpen }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const onSubmit = async (email, username) => {
    console.log('submit');
    try {
      // const response = await fetch(`user/profile/setting/${user.user._id}`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   Authorization: `Bearer ${user.token}`,
      //   body: JSON.stringify({ email, username })
      // });


    } catch (error) {
      console.log(error);
    }
  }

  const print = () => {
    console.log(user);
    console.log(user.token);
    console.log(user.user._id);
    // console.log(touched);
  };

  const { values, errors, touched, isSubmitting, handleSubmit, handleBlur, handleChange, setFieldValue } = useFormik({
    initialValues: {
      email: user.user.email,
      username: user.user.username,
    },
    validationSchema: UserEditAccountInfoValidation,
    print
  });



  return (
    <>
      <Grid xs={18}>
        <FormControl error={errors.email && touched.email ? true : false}>
          <FormLabel>Email</FormLabel>
          <Input type='text' id='email' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px) saturate(180%)', border: '1px solid rgba(50, 50, 50, 0.3)' }} placeholder={user.user.email} />
          <FormHelperText sx={{ height: '1rem' }}>{errors.email && touched.email ? errors.email : (' ')}</FormHelperText>
        </FormControl>
      </Grid>

      <Grid xs={18}>
        <FormControl error={errors.username && touched.username ? true : false}>
          <FormLabel>Username</FormLabel>
          <Input type='text' id='username' name='username' value={values.username} onChange={handleChange} onBlur={handleBlur} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px) saturate(180%)', border: '1px solid rgba(50, 50, 50, 0.3)' }} placeholder={user.user.username} />
          <FormHelperText sx={{ height: '1rem' }}>{errors.username && touched.username ? errors.username : (' ')}</FormHelperText>
        </FormControl>
      </Grid>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'end', mr: 1, mt: 50.7 }}>
        <Button onClick={() => setSettingModalOpen(false)}>Discard Changes</Button>
        <Button onClick={handleSubmit} sx={{ ml: 3 }}>Submit Changes</Button>
      </Box>
    </>
  )
}

export default AccountInformationTab