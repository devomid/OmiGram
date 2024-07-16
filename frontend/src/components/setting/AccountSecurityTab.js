import { Box, Button, FormControl, FormHelperText, FormLabel, Grid, IconButton, Input } from '@mui/joy';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { UserEditAccountSecurityValidation } from '../../validation/yupUserSchema';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const AccountSecurityTab = ({ setSettingModalOpen }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [visibility, setVisibility] = useState(true);

  const onSubmit = () => {

  }

  const { values, errors, touched, isSubmitting, handleSubmit, handleBlur, handleChange, setFieldValue } = useFormik({
    initialValues: {
      oldPassword: '',
      password: '',
      passwordConfirmation: ''
    },
    validationSchema: UserEditAccountSecurityValidation,
    onSubmit
  });

  const print = () => {
    console.log(values);
    console.log(errors);
    console.log(touched);
  };

  return (
    <>
      <Grid xs={18}>
        <FormControl error={errors.oldPassword && touched.oldPassword ? true : false}>
          <FormLabel>Old password</FormLabel>
          <Input id='oldPassword' name='oldPassword' value={values.oldPassword} onChange={handleChange} onBlur={handleBlur} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px) saturate(180%)', border: '1px solid rgba(50, 50, 50, 0.3)' }} endDecorator={<IconButton onClick={() => setVisibility(!visibility)}>{visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton>} type={visibility ? 'password' : 'text'} />
          <FormHelperText>{errors.oldPassword && touched.oldPassword ? errors.oldPassword : (' ')}</FormHelperText>
        </FormControl>
      </Grid>

      <Grid xs={18}>
        <FormControl error={errors.password && touched.password ? true : false}>
          <FormLabel>New Password</FormLabel>
          <Input id='password' name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px) saturate(180%)', border: '1px solid rgba(50, 50, 50, 0.3)' }} endDecorator={<IconButton onClick={() => setVisibility(!visibility)}>{visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton>} type={visibility ? 'password' : 'text'} />
          <FormHelperText>{errors.password && touched.password ? errors.password : (' ')}</FormHelperText>
        </FormControl>
      </Grid>

      <Grid xs={18}>
        <FormControl error={errors.passwordConfirmation && touched.passwordConfirmation ? true : false}>
          <FormLabel>Confirm Password</FormLabel>
          <Input id='passwordConfirmation' name='passwordConfirmation' value={values.passwordConfirmation} onChange={handleChange} onBlur={handleBlur} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px) saturate(180%)', border: '1px solid rgba(50, 50, 50, 0.3)' }} endDecorator={<IconButton onClick={() => setVisibility(!visibility)}>{visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton>} type={visibility ? 'password' : 'text'} />
          <FormHelperText>{errors.passwordConfirmation && touched.passwordConfirmation ? errors.passwordConfirmation : (' ')}</FormHelperText>
        </FormControl>
      </Grid>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'end', mr: 1, mt: 44.2 }}>
        <Button onClick={() => setSettingModalOpen(false)}>Discard Changes</Button>
        <Button onClick={() => print()} sx={{ ml: 3 }}>Change Password</Button>
      </Box>
    </>
  )
}

export default AccountSecurityTab