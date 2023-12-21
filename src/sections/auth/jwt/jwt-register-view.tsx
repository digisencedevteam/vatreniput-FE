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
import { useBoolean } from 'src/hooks/use-boolean';
import { useAuthContext } from 'src/auth/hooks';
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import ContactUsForm from 'src/components/contact-us-form/ContactUsForm';
import { paths } from 'src/routes/paths';
import { Snackbar } from '@mui/material';
import { useRouter } from 'src/routes/hooks';

const JwtRegisterView = () => {
  const { register } = useAuthContext();
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const password = useBoolean();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[A-Za-z\s'-]+$/, 'Ime može sadržavati samo slova.')
      .required('Ime je obvezno.'),
    lastName: Yup.string()
      .matches(/^[A-Za-z\s'-]+$/, 'Ime može sadržavati samo slova.')
      .required('Prezime je obvezno.'),
    username: Yup.string().required('Korisničko ime je obvezno.'),
    email: Yup.string()
      .required('Email je obvezan.')
      .email('Email mora biti u odgovarajućem formatu.'),
    password: Yup.string().required('Lozinka je obvezna.'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await register?.(
        data.email,
        data.password,
        data.firstName,
        data.lastName,
        data.username || ''
      );

      router.push(paths.emailVerification);
    } catch (error) {
      console.error(error);
      reset();
      let message = 'Došlo je do greške prilikom registracije.';
      if (error.response) {
        message = error.response.data.message || message;
      }
      handleOpenSnackbar(message);
    }
  });

  const handleOpenSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const renderHead = (
    <Stack
      spacing={2}
      sx={{ mb: 5, position: 'relative' }}
    >
      <Alert
        severity='success'
        sx={{ mb: 3 }}
      >
        Dobrodošli na Vatreni Put.U samo nekoliko klikova registrirajte se i
        krenite u digitalnu avanturu skupljanja sličica!
      </Alert>
      <Typography variant='h4'>Registriraj se</Typography>
      <Stack
        direction='row'
        spacing={0.5}
      >
        <Typography variant='body2'>I pokreni svoj Vatreni Put!</Typography>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component='div'
      sx={{
        color: 'text.secondary',
        mt: 2.5,
        typography: 'caption',
        textAlign: 'center',
      }}
    >
      {'Kreiranjem računa upoznat sam sa '}
      <Link
        underline='always'
        color='text.primary'
        href='/usage'
      >
        Pravilima Korištenja
      </Link>
      {' i '}
      <Link
        underline='always'
        color='text.primary'
        href='/privacy'
      >
        Politikom Privatnosti
      </Link>
      .
    </Typography>
  );

  const renderForm = (
    <FormProvider
      methods={methods}
      onSubmit={onSubmit}
    >
      <Stack spacing={2.5}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
        >
          <RHFTextField
            name='firstName'
            label='Ime'
          />
          <RHFTextField
            name='lastName'
            label='Prezime'
          />
        </Stack>
        <RHFTextField
          name='email'
          label='Email adresa'
        />
        <RHFTextField
          name='username'
          label='Korisničko Ime'
        />
        <RHFTextField
          name='password'
          label='Lozinka'
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={password.onToggle}
                  edge='end'
                >
                  <Iconify
                    icon={
                      password.value
                        ? 'solar:eye-bold'
                        : 'solar:eye-closed-bold'
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <LoadingButton
          fullWidth
          color='inherit'
          size='large'
          type='submit'
          variant='contained'
          loading={isSubmitting}
        >
          Registriraj se
        </LoadingButton>
        <ContactUsForm />
      </Stack>
    </FormProvider>
  );

  return (
    <>
      {renderHead}
      {renderForm}
      {renderTerms}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='error'
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
export default JwtRegisterView;
