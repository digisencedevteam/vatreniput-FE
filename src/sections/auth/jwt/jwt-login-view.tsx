import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { useSearchParams, useRouter } from 'src/routes/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';
import { useBoolean } from 'src/hooks/use-boolean';
import { useAuthContext } from 'src/auth/hooks';
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import ContactUsForm from 'src/components/contact-us-form/ContactUsForm';
import { Box, Grid, Snackbar } from '@mui/material';
import InstallPWA from 'src/components/install-pwa-modal/install-pwa';

const JwtLoginView = () => {
  const { login } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const password = useBoolean();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });
  const defaultValues = {
    email: '',
    password: '',
  };
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login?.(data.email, data.password);
      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      const message =
        error.response?.data?.message || 'An error occurred during login.';
      setSnackbarMessage(message);
      setOpenSnackbar(true);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant='h4'>Prijavi se na platformu!</Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      <RHFTextField name='email' label='Email' />
      <RHFTextField
        name='password'
        label='Lozinka'
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={password.onToggle} edge='end'>
                <Iconify
                  icon={
                    password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'
                  }
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Grid container direction={'row'} justifyContent={'space-between'}>
        <Grid item>
          <InstallPWA />
        </Grid>
        <Grid item>
          <Link
            variant='body2'
            color='inherit'
            underline='always'
            sx={{ alignSelf: 'flex-end', cursor: 'pointer' }}
            href='/forgot-password'
          >
            Zaboravili ste lozinku?
          </Link>
        </Grid>
      </Grid>
      <LoadingButton
        fullWidth
        color='inherit'
        size='large'
        type='submit'
        variant='contained'
        loading={isSubmitting}
      >
        Prijava
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      <Box>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          {renderHead}
          {renderForm}
        </FormProvider>
        <ContactUsForm />
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity='error'
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
export default JwtLoginView;
