import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MainRoutes } from './routes/main';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../lib/theme';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
};
