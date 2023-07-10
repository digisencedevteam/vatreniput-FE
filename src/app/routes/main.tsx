import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Library } from '../pages/deleteThisLater/DeleteMeLater';
import { Home } from '../pages/home/Home';
import Login from '../pages/login/Login';

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/library" element={<Library />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
