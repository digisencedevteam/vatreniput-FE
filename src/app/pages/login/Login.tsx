import { Helmet } from 'react-helmet';
import { CssBaseline, Paper, Checkbox, Box } from '@mui/material';
import { BsFillLockFill } from 'react-icons/bs';
import { styled, ThemeProvider, useTheme } from '@mui/system';
import BackgroundImage from './../../../assets/img/backgoundLogin.jpg';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  FormControlLabel,
  Avatar,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthorizationContext } from '../../../lib/context/AuthorizationContext';
import { login } from '../../../lib/api/auth/authApi';

const StyledGrid = styled(Grid)(() => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url(${BackgroundImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  marginTop: '5%',
  color: theme.palette.secondary.contrastText,
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  margin: '2%',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-input': {
    color: theme.palette.secondary.contrastText,
  },
  '& label': {
    color: theme.palette.secondary.contrastText,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.secondary.contrastText,
    },
  },
}));

const StyledFormControlLabel = styled(FormControlLabel)(
  ({ theme }) => ({
    color: theme.palette.secondary.contrastText,
  })
);

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: '3px',
  marginBottom: '2px',
  backgroundColor: theme.palette.secondary.contrastText,
  color: theme.palette.secondary.formBackground,
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
}));

const ToggleButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  border: 'solid',
  color: theme.palette.secondary.contrastText,
  cursor: 'pointer',
  fontSize: 14,
  outline: 'none',
  margin: 20,
  padding: 20,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '400px',
  paddingLeft: '2%',
  paddingRight: '2%',
  backgroundColor: theme.palette.secondary.formBackground,
  color: theme.palette.secondary.contrastText,
}));

const ErrorMsg = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  color: 'white',
  backgroundColor: theme.palette.error.light,
  border: `1px solid ${theme.palette.error.main}`,
  padding: theme.spacing(1.5, 2),
  marginBottom: theme.spacing(2),
}));

interface paletteType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onUpdateToken: (jwt: string) => void;
}

const Login = ({
  isDarkMode,
  toggleDarkMode,
  onUpdateToken,
}: paletteType) => {
  const { setJwt } = useAuthorizationContext();
  const navigate = useNavigate();
  const theme = useTheme();
  const [remember, setRemember] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Potreban validan email format')
      .required('Email je potreban'),
    password: Yup.string()
      .min(4, 'Lozinka mora sadržati barem 4 znaka')
      .required('Lozinka je potrebna'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const loginData = await login(values);
        const jwt = loginData.accessToken;
        await onUpdateToken(jwt);
        navigate('/');
      } catch (error) {
        setErrorMsg('Incorrect Login');
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {' '}
      {/* Wrap the Login component with ThemeProvider */}
      <>
        <Helmet>
          <title>Vatreni Put - Log - In</title>
          <meta
            name="description"
            content="This is the login page of vatreni put application."
          />
        </Helmet>
        <CssBaseline />
        <StyledGrid container as="main">
          <StyledPaper elevation={6}>
            <StyledAvatar>
              <BsFillLockFill />
            </StyledAvatar>
            <StyledTypography as="h2" variant="h5">
              Prijava
            </StyledTypography>
            <form noValidate onSubmit={formik.handleSubmit}>
              <StyledTextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Adresa"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  !!(formik.touched.email && formik.errors.email)
                }
                helperText={
                  formik.touched.email && formik.errors.email
                }
              />
              <StyledTextField
                margin="normal"
                fullWidth
                name="password"
                label="Lozinka"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  !!(
                    formik.touched.password && formik.errors.password
                  )
                }
                helperText={
                  formik.touched.password && formik.errors.password
                }
              />
              <StyledFormControlLabel
                control={
                  <Checkbox
                    value={remember}
                    onChange={() => setRemember(!remember)}
                  />
                }
                label="Zapamti moju prijavu"
              />
              <StyledButton
                type="submit"
                fullWidth
                variant="contained"
              >
                PRIJAVI SE
              </StyledButton>
              <Grid container>
                <Grid item xs>
                  <StyledLink href="#">
                    Zaboravljena Lozinka
                  </StyledLink>
                </Grid>
                <Grid item>
                  <StyledLink href="#">
                    Nemaš račun? Registriraj se!
                  </StyledLink>
                </Grid>
              </Grid>
            </form>
            {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
            <ToggleButton onClick={toggleDarkMode}>
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </ToggleButton>
          </StyledPaper>
        </StyledGrid>
      </>
    </ThemeProvider>
  );
};

export default Login;
