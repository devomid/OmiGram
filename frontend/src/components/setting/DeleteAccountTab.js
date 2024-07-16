import { Box, Button, FormControl, FormHelperText, FormLabel, Grid, IconButton, Input } from '@mui/joy'
import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import { UserDeleteAccountValidation } from '../../validation/yupUserSchema';


const DeleteAccountTab = ({ setSettingModalOpen, setDeleteAccountModal }) => {
  const [visibility, setVisibility] = useState(true);

  const onSubmit = () => {

  }

  const { values, errors, touched, isSubmitting, handleSubmit, handleBlur, handleChange, setFieldValue } = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: UserDeleteAccountValidation,
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
        <FormControl error={errors.password && touched.password ? true : false}>
          <FormLabel>password</FormLabel>
          <Input id='password' name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px) saturate(180%)', border: '1px solid rgba(50, 50, 50, 0.3)' }} placeholder="Enter your password to delete the account..." endDecorator={<IconButton onClick={() => setVisibility(!visibility)}>{visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton>} type={visibility ? 'password' : 'text'} />
          <FormHelperText>{errors.password && touched.password ? errors.password : (' ')}</FormHelperText>
        </FormControl>
      </Grid>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'end', mr: 1, mt: 65.3 }}>
        <Button onClick={() => setSettingModalOpen(false)}>Discard Changes</Button>
        <Button sx={{ ml: 2 }} onClick={setDeleteAccountModal} color='danger'>Delete Account</Button>
      </Box>
    </>
  )
}

export default DeleteAccountTab