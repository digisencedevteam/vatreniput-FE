import { Helmet } from 'react-helmet';
import {
  CssBaseline,
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  FormControlLabel,
  Checkbox,
  Avatar,
} from '@mui/material';
import { BsFillLockFill } from 'react-icons/bs';
import { useTheme } from '@mui/material/styles';
import { styled as muiStyled } from '@mui/material/styles';


const ToggleButton = muiStyled('button')(({ theme }) => ({
  backgroundColor: 'transparent',
  border: 'solid',
  color: theme.palette.secondary.contrastText,
  cursor: 'pointer',
  fontSize: 14,
  outline: 'none',
  margin: 20,
  padding: 20
}));

const Login = ({ isDarkMode, toggleDarkMode }: any) => {

  const theme = useTheme();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <>
      <Helmet>
        <title>Vatreni Put - Log - In</title>
        <meta
          name="description"
          content="This is the login page of vatreni put application."
        />
      </Helmet>
      <CssBaseline />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          sm={12}
          md={12}
          lg={12}
          sx={{
            backgroundImage:
              'url(https://juzni.hr/media/k2/items/cache/24fc8d3f0c18a343756c9051aeb41a71_L.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component={Paper}
            elevation={6}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '400px',
              backgroundColor: theme.palette.secondary.formBackground,
              color: theme.palette.secondary.contrastText,
            }}
          >
            <Avatar sx={{ m: 1, color: theme.palette.secondary.contrastText }}>
              <BsFillLockFill />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ color: theme.palette.secondary.contrastText }}>
              Prijava
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Adresa"
                name="email"
                autoComplete="email"
                autoFocus
                InputLabelProps={{
                  style: { color: theme.palette.secondary.contrastText },
                }}
                inputProps={{ style: { color: theme.palette.secondary.contrastText } }}
                sx={{ borderColor: theme.palette.secondary.textFieldBorder }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Lozinka"
                type="password"
                id="password"
                autoComplete="current-password"
                InputLabelProps={{
                  style: {
                    color: theme.palette.secondary.contrastText,
                  },
                }}
                inputProps={{ style: { color: theme.palette.secondary.contrastText } }}
                sx={{ borderColor: theme.palette.secondary.textFieldBorder }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" sx={{ color: theme.palette.secondary.contrastText }} />}
                label="Zapamti moju prijavu"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: theme.palette.secondary.contrastText }}
              >PRIJAVI SE
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Zaboravljena Lozinka
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Nemaš račun? Registriraj se!"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <ToggleButton onClick={toggleDarkMode} sx={{ color: theme.palette.secondary.contrastText }}>
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </ToggleButton>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
