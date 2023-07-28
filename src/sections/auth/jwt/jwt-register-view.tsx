import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { useBoolean } from 'src/hooks/use-boolean';
import { useSearchParams, useRouter } from 'src/routes/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';
import { useAuthContext } from 'src/auth/hooks';
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import InvalidAlbumPage from 'src/pages/InvalidAlbum';
import axios, { endpoints } from 'src/utils/axios';
import { LoadingScreen } from 'src/components/loading-screen';

export default function JwtRegisterView() {
  const { register } = useAuthContext();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [isAlbumValid, setIsAlbumValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();
  const paramValue = searchParams.get('code');

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    username: Yup.string(),
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
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
        data.username || '',
        paramValue || ''
      );

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const isAlbumCodeValid = async (code: string) => {
    setIsLoading(true);
    const response = await axios.get(endpoints.album.validate + code);
    setIsAlbumValid(response.data.isAlbumValid);
    setIsLoading(false);
  };

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Alert severity="success" sx={{ mb: 3 }}>
        Vaš album je ispravan i spreman za registraciju!
      </Alert>
      <Typography variant="h4">Registriraj se</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">
          {' '}
          I pokrenite svoj vatreni put!{' '}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        color: 'text.secondary',
        mt: 2.5,
        typography: 'caption',
        textAlign: 'center',
      }}
    >
      {'Kreiranjem računa upoznat sam sa '}
      <Link underline="always" color="text.primary">
        Pravilima Korištenja
      </Link>
      {' i '}
      <Link underline="always" color="text.primary">
        Politikom Privatnosti
      </Link>
      .
    </Typography>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>

        <RHFTextField name="email" label="Email address" />

        <RHFTextField name="username" label="Username" />

        <RHFTextField
          name="password"
          label="Password"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
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
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Registriraj se
        </LoadingButton>
      </Stack>
    </FormProvider>
  );

  useEffect(() => {
    paramValue ? isAlbumCodeValid(paramValue || '') : router.push('/');
  }, []);

  if (isLoading) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }
  if (!isAlbumValid) {
    return (
      <>
        <InvalidAlbumPage />
      </>
    );
  }

  return (
    <>
      {renderHead}

      {renderForm}

      {renderTerms}
    </>
  );
}
