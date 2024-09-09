import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { UserSigninValidation } from '../validation/yupUserSchema.js';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, FormControl, FormHelperText, Grid, IconButton, Input, Link, Modal, Sheet, Stack, SvgIcon, Tooltip, Typography } from '@mui/joy';

const LoginForm = () => {
  const [visibility, setVisibility] = useState(true);
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const { login } = useLogin();

  const onSubmit = async (values, actions) => {
    await login('values.username', values.password);
    // actions.resetForm();
    // navigate(`/home`);
    // setOpen(false);
    // window.location.reload()
    console.log('hi');
  };

  const google = () => {
    window.open('https://omigramapi.onrender.com/user/auth/google', '_self')
  };

  const { values, errors, touched, isSubmitting, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: UserSigninValidation, onSubmit
  });


  return (
    <Box>
      <Modal aria-labelledby="modal-title" aria-describedby="modal-desc" open={open} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >

        <Sheet variant="solid" sx={{ width: 350, height: 620, maxWidth: 500, borderRadius: 'lg', p: 3, boxShadow: 'lg', backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(20px) saturate(180%)', border: '1px solid rgba(50, 50, 50, 0.3)' }}>

          <Box>
            <Typography component="h2" id="modal-title" level="h4" textColor="black" fontWeight="lg" mb={1} >
              OmiGram
            </Typography>
            <Typography component="h2" id="modal-title" level="h6" textColor="black" fontWeight="md" mb={1} >
              Sign in
            </Typography>
          </Box>

          <Box>
            <Box>
              <Stack sx={{ mt: 3 }} spacing={3}>
                <FormControl error={errors.username && touched.username ? true : false} fullWidth>
                  <Input type='text' id='username' name='username' value={values.username} onChange={handleChange} onBlur={handleBlur} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(20px) saturate(180%)' }} error={errors.username && touched.username ? 'true' : false} required placeholder="Username" />
                  <FormHelperText sx={{ height: '1rem' }}>{errors.username && touched.username ? errors.username : (' ')}</FormHelperText>
                </FormControl>

                <FormControl error={errors.password && touched.password ? true : false}>
                  <Input id='password' name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px) saturate(180%)', border: '1px solid rgba(50, 50, 50, 0.3)' }} endDecorator={<IconButton onClick={() => setVisibility(!visibility)}>{visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton>} type={visibility ? 'password' : 'text'} placeholder='Password' />
                  <FormHelperText sx={{ height: '1rem' }}>{errors.password && touched.password ? errors.password : ' '}</FormHelperText>
                </FormControl>
              </Stack>
            </Box>

            <Divider sx={{ mt: 13.2 }}>Social Media Sign In</Divider>

            <Box sx={{ width: '100%' }}>
              <Grid container spacing={2} columns={18} sx={{ flexGrow: 1, mt: 1 }} alignItems='center' justifyContent='center'>
                <Tooltip title='Sign in with Google account' arrow color="neutral" placement="bottom-start" size="sm" variant="soft" >
                  <Grid xs={6}><IconButton sx={{ width: '100%' }} onClick={google}>
                    <SvgIcon>
                      <svg width="800px" height="800px" viewBox="0 0 32 32" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><path d="M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16" fill="#00ac47" /><path d="M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16" fill="#4285f4" /><path d="M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z" fill="#ffba00" /><polygon fill="#2ab2db" points="8.718 13.374 8.718 13.374 8.718 13.374 8.718 13.374" /><path d="M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z" fill="#ea4435" /><polygon fill="#2ab2db" points="8.718 18.626 8.718 18.626 8.718 18.626 8.718 18.626" /><path d="M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z" fill="#4285f4" /></svg>
                    </SvgIcon>
                  </IconButton></Grid>
                </Tooltip >
                <Tooltip title='Sign in with Facebook account' arrow color="neutral" placement="bottom" size="sm" variant="soft" >
                  <Grid xs={6}>
                    <IconButton sx={{ width: '100%' }}>
                      <SvgIcon>
                        <svg width="800px" height="800px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Color-" transform="translate(-200.000000, -160.000000)" fill="#4460A0"><path d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z" id="Facebook"></path></g></g></svg>
                      </SvgIcon>
                    </IconButton>
                  </Grid>
                </Tooltip>
                <Tooltip title='Sign in with GitHub account' arrow color="neutral" placement="bottom-end" size="sm" variant="soft" >
                  <Grid xs={6}>
                    <IconButton sx={{ width: '100%' }}>
                      <SvgIcon>
                        <svg width="800px" height="800px" viewBox="0 -0.5 24 24" id="meteor-icon-kit__regular-github" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clipRule="evenodd" d="M12.2047 0.00001C6.56031 -0.005731 1.74628 4.08615 0.842541 9.6577C-0.061195 15.2293 3.2126 20.6331 8.56941 22.4118C9.14823 22.5177 9.35294 22.1577 9.35294 21.8541C9.35294 21.5506 9.35294 20.8588 9.35294 19.8988C6.14117 20.5977 5.46353 18.3529 5.46353 18.3529C5.25046 17.6572 4.79779 17.0595 4.18588 16.6659C3.14823 15.96 4.27059 15.96 4.27059 15.96C5.00761 16.0641 5.65578 16.5014 6.02823 17.1459C6.34368 17.7179 6.87393 18.1406 7.50179 18.3208C8.12965 18.5009 8.8034 18.4236 9.37411 18.1059C9.41842 17.5252 9.66876 16.9794 10.08 16.5671C7.5247 16.2777 4.84235 15.2894 4.84235 10.92C4.82481 9.7786 5.24688 8.67412 6.02117 7.8353C5.67632 6.84285 5.71662 5.7571 6.13412 4.79295C6.13412 4.79295 7.10117 4.48236 9.29647 5.97177C11.1816 5.45419 13.1713 5.45419 15.0565 5.97177C17.2518 4.48236 18.2118 4.79295 18.2118 4.79295C18.6351 5.74689 18.6854 6.82486 18.3529 7.81412C19.1272 8.65294 19.5493 9.7574 19.5318 10.8988C19.5318 15.3177 16.8424 16.2847 14.28 16.5459C14.8359 17.1047 15.1218 17.8774 15.0635 18.6635C15.0635 20.2024 15.0635 21.4447 15.0635 21.8188C15.0635 22.1929 15.2682 22.4824 15.8541 22.3694C21.1473 20.5447 24.3569 15.1728 23.4554 9.6469C22.5539 4.1211 17.8034 0.04779 12.2047 0.00001z" fill="#758CA3" /></svg>
                      </SvgIcon>
                    </IconButton>
                  </Grid>
                </Tooltip>
              </Grid>
            </Box>

            <Box sx={{ height: 60, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', mt: 7, mb: 3 }}>
              <Button sx={{ width: '100%' }} type="submit" loading={isSubmitting} loadingPosition="start" onClick={handleSubmit} >Sign In</Button>
            </Box>

            <Box>
              <Link href={'/user/auth/signup'}>Don't have an account? Signup here!</Link>
              <Link href={'/user/auth/signup'}>Forgot your password? Click here!</Link>
            </Box>

          </Box>
        </Sheet>
      </Modal>
    </Box>

  );
}

export default LoginForm;