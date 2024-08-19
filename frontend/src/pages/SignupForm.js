import { Box, Button, Grid, Link, Modal, Sheet, Stack, Typography } from '@mui/joy';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SignupAccountInfo from '../components/Signup/SignupAccountInfo.js';
import SignupPass from '../components/Signup/SignupPass.js';
import SignUpPersonalInfo from '../components/Signup/SignupPersonalInfo.js';
import { useSignup } from "../hooks/useSignup.js";
import { UserSignupValidation } from '../validation/yupUserSchema.js';
import AvatarUploadForm from './AvatarUpload.js';

const SignupForm = () => {
  const [page, setPage] = useState(0);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const FormTitles = ['Personal Info', 'Account Info', 'Password']
  const { signup } = useSignup();
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    passwordConfirmation: '',
  })

  const PageDisplay = () => {
    if (page === 0) {
      return <SignUpPersonalInfo inputData={inputData} setInputData={setInputData} values={values} errors={errors} touched={touched} handleBlur={handleBlur} handleChange={handleChange} />
    } else if (page === 1) {
      return <SignupAccountInfo inputData={inputData} setInputData={setInputData} values={values} errors={errors} touched={touched} handleBlur={handleBlur} handleChange={handleChange} />
    } else {
      return <SignupPass inputData={inputData} setInputData={setInputData} values={values} errors={errors} touched={touched} handleBlur={handleBlur} handleChange={handleChange} />
    }
  }

  const onSubmit = async (values, actions) => {
    console.log(values);

    await signup(values.username, values.email, values.password, values.firstName, values.lastName, values.birthDate, values.phoneNumber);
    actions.resetForm();
    navigate('/user/auth/signup/avatar');
  };

  const google = () => {
    window.open('https://omigramapi.onrender.com/user/auth/google', '_self')
  };


  const { values, errors, touched, isSubmitting, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      firstName: '',
      lastName: '',
      birthDate: '',
      phoneNumber: '',
    },
    validationSchema: UserSignupValidation,
    onSubmit
  });

  const submitAndAvatar = async () => {
    await handleSubmit;
    // setAvatarOpen(true);

  }

  return (
    <Box>
      <Modal aria-labelledby="modal-title" aria-describedby="modal-desc" open={/* open */ true} /* onClose={() => setOpen(false)} */ sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >

        <Sheet variant="solid" sx={{ width: 350, height: 620, maxWidth: 500, borderRadius: 'lg', p: 3, boxShadow: 'lg', backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(20px) saturate(180%)', border: '1px solid rgba(50, 50, 50, 0.3)' }}>
          <Box>
            <Typography component="h2" id="modal-title" level="h4" textColor="black" fontWeight="lg" mb={1} >
              OmiGram
            </Typography>
            <Typography component="h2" id="modal-title" level="h6" textColor="black" fontWeight="md" mb={1} >
              {FormTitles[page]}
            </Typography>
          </Box>

          <Box>
            <Stack sx={{ mt: 3 }} direction="column" justifyContent="center" alignItems="stretch" spacing={1}>
              <Box> {/* body */}
                {PageDisplay()}
              </Box>
              <Box> {/* footer */}
                <Box position='initial'>
                  <Grid container spacing={2} columns={16} sx={{ flexGrow: 1, mt: 8, mb: 2 }}>
                    <Grid xs={8}><Button sx={{ width: '100%' }} disabled={page === 0} onClick={() => { setPage((currentPage) => currentPage - 1) }}>Back</Button></Grid>
                    {page === FormTitles.length - 1 ? (
                      <Grid xs={8}><Button sx={{ width: '100%' }} loading={isSubmitting} loadingPosition="start" onClick={handleSubmit} >Submit</Button></Grid>
                    ) : (
                      <Grid xs={8}><Button sx={{ width: '100%' }} loading={isSubmitting} loadingPosition="start" onClick={() => { setPage((currentPage) => currentPage + 1) }} >Next</Button></Grid>
                    )}
                  </Grid>
                </Box>
                <Link href={'/user/auth/login'}>Already have an account? Sign in here!</Link>
                <Link href={'/user/auth/signup'}>Forgot your password? Click here!</Link>
              </Box>
            </Stack>
          </Box>
          {/* <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", mt: 1.5 }}>
            <Stepper size='sm' sx={{ width: '80%', "--Step-connectorThickness": '2px', color: 'primary' }}>
              <Step orientation='vertical' indicator={<StepIndicator color='primary' variant='solid'></StepIndicator>}></Step>
              <Step orientation='vertical' indicator={<StepIndicator color='primary' variant='solid'></StepIndicator>}></Step>
              <Step orientation='vertical' indicator={<StepIndicator color='primary' variant='solid'></StepIndicator>}></Step>
            </Stepper>
          </Box> */}
        </Sheet>
      </Modal>
      <AvatarUploadForm avatarOpen={avatarOpen} setAvatarOpen={setAvatarOpen} />
    </Box>
  )
}

export default SignupForm;