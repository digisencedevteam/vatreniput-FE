import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MainRoutes } from './routes/main';

export const App = () => {
  return (
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  );
};
