import { createTheme } from '@mui/material/styles';

export const lightPalette = {
  primary: {
    main: '#0066ff',
  },
  secondary: {
    light: '#0066ff',
    main: '#ffffff',
    contrastText: '#141518',
    formBackground: '#ffffff',
    inputField: 'rgba(0, 0, 0, 0.70)',
    textFieldBorder: '#141518', 

  },
  custom: {
    light: '#ffffff',
    main: '#b22222',
    dark: '#b22222',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  common: {
    black: '#000000',
    white: '#ffffff',
  },
  error: {
    main: '#ff0000',
  },
  success: {
    main: '#00ff00',
  },
  warning: {
    main: '#ff9900',
  },
  info: {
    main: '#0099ff',
  },
};

export const darkPalette = {
  primary: {
    main: '#0066ff',
  },
  secondary: {
    light: '#0066ff',
    main: '#000000',
    contrastText: '#ffffff',
    formBackground: '#141518',
    textFieldBorder: '#ffffff',
  },
  custom: {
    light: '#ffffff',
    main: '#b22222',
    dark: '#2b2a33',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  common: {
    black: '#000000',
    white: '#ffffff',
  },
  error: {
    main: '#ff0000',
  },
  success: {
    main: '#00ff00',
  },
  warning: {
    main: '#ff9900',
  },
  info: {
    main: '#0099ff',
  },
};

export const lightTheme = createTheme({
  palette: lightPalette,
});

export const darkTheme = createTheme({
  palette: darkPalette,
});