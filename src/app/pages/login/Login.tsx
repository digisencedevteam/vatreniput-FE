import { Helmet } from 'react-helmet';
import { CssBaseline, Paper, Checkbox } from '@mui/material';
import { BsFillLockFill } from 'react-icons/bs';
import { styled } from '@mui/system';
import BackgroundImage from './../../../assets/img/backgoundLogin.jpg';
import { Grid, Typography, TextField, Button, Link, FormControlLabel, Avatar } from '@mui/material';

const StyledGrid = styled(Grid)(({ theme }) => ({
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
  margin: '2%'
}));
const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  color: theme.palette.secondary.contrastText,
  borderColor: theme.palette.secondary.textFieldBorder,
}));
const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
}));
const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: '3px',
  marginBottom: '2px',
  backgroundColor: theme.palette.secondary.contrastText,
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

interface paletteType {
  isDarkMode: boolean,
  toggleDarkMode: () => void;
}

const Login = ({ isDarkMode, toggleDarkMode }: paletteType) => {

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
      <StyledGrid container as="main">
        <StyledPaper elevation={6}>
          <StyledAvatar>
            <BsFillLockFill />
          </StyledAvatar>
          <StyledTypography as="h1" variant="h5">
            Prijava
          </StyledTypography>
          <form noValidate onSubmit={handleSubmit}>
            <StyledTextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Adresa"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <StyledTextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Lozinka"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <StyledFormControlLabel
              control={<Checkbox value="remember" />}
              label="Zapamti moju prijavu"
            />
            <StyledButton type="submit" fullWidth variant="contained">
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
                  {"Nemaš račun? Registriraj se!"}
                </StyledLink>
              </Grid>
            </Grid>
          </form>
          <ToggleButton onClick={toggleDarkMode}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </ToggleButton>
        </StyledPaper>
      </StyledGrid>
    </>
  );
};

export default Login;
