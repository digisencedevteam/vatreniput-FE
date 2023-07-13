import { Helmet } from "react-helmet";
import { styled, ThemeProvider, useTheme } from "@mui/system";
import {
  Avatar,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import BackgroundImage from "./../../../assets/img/backgoundLogin.jpg";
import { BsFillLockFill } from "react-icons/bs";
import { useFormik } from "formik";
import * as Yup from "yup";

const StyledGrid = styled(Grid)(() => ({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage: `url(${BackgroundImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  marginTop: "5%",
  color: theme.palette.secondary.contrastText,
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  margin: "2%",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase-input": {
    color: theme.palette.secondary.contrastText,
  },
  "& label": {
    color: theme.palette.secondary.contrastText,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.secondary.contrastText,
    },
  },
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: "3px",
  marginBottom: "2px",
  backgroundColor: theme.palette.secondary.contrastText,
  color: theme.palette.secondary.formBackground,
}));

const ToggleButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  border: "solid",
  background: theme.palette.secondary.formBackground,
  color: theme.palette.secondary.contrastText,
  cursor: "pointer",
  fontSize: 14,
  outline: "none",
  margin: 20,
  padding: 20,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "400px",
  paddingLeft: "2%",
  paddingRight: "2%",
  backgroundColor: theme.palette.secondary.formBackground,
  color: theme.palette.secondary.contrastText,
}));

interface paletteType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Register = ({ isDarkMode, toggleDarkMode }: paletteType) => {
  const theme = useTheme();

  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Ime je potrebno"),
    lastName: Yup.string().required("Prezime je potrebno"),
    username: Yup.string().required("Korisničko ime je potrebno"),
    email: Yup.string()
      .email("Potreban validan email format")
      .required("Email je potreban"),
    password: Yup.string()
      .min(8, "Lozinka mora sadržati barem 8 znakova")
      .matches(
        /^(?=.*[!@#$%^&*])/,
        "Lozinka mora sadržati barem 1 poseban znak"
      )
      .required("Lozinka je potrebna"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Lozinke se ne podudaraju")
      .required("Potrebno je ponoviti lozinku"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <>
        <Helmet>
          <title>Vatreni Put - Registracija</title>
          <meta
            name="description"
            content="This is the register page of vatreni put application."
          />
        </Helmet>
        <CssBaseline />
        <StyledGrid container as="main">
          <StyledPaper elevation={6}>
            <StyledAvatar>
              <BsFillLockFill />
            </StyledAvatar>
            <StyledTypography as="h2" variant="h5">
              Registracija
            </StyledTypography>
            <form noValidate onSubmit={formik.handleSubmit}>
              <StyledTextField
                margin="normal"
                fullWidth
                id="firstName"
                label="Ime"
                name="firstName"
                autoComplete="given-name"
                autoFocus
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!(formik.touched.firstName && formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <StyledTextField
                margin="normal"
                fullWidth
                id="lastName"
                label="Prezime"
                name="lastName"
                autoComplete="family-name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!(formik.touched.lastName && formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
              <StyledTextField
                margin="normal"
                fullWidth
                id="username"
                label="Korisničko ime"
                name="username"
                autoComplete="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!(formik.touched.username && formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
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
                error={!!(formik.touched.email && formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
                error={!!(formik.touched.password && formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <StyledTextField
                margin="normal"
                fullWidth
                name="confirmPassword"
                label="Potvrdi lozinku"
                type="password"
                id="confirmPassword"
                autoComplete="confirm-password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  !!(
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  )
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
              <StyledFormControlLabel
                control={<Checkbox value="remember" />}
                label="Zapamti moju prijavu"
              />
              <StyledButton type="submit" fullWidth variant="contained">
                REGISTRIRAJ SE
              </StyledButton>
            </form>
            <ToggleButton onClick={toggleDarkMode}>
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </ToggleButton>
          </StyledPaper>
        </StyledGrid>
      </>
    </ThemeProvider>
  );
};

export default Register;
