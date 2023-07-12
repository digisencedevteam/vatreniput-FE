import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Library } from '../pages/deleteThisLater/DeleteMeLater';
import { Home } from '../pages/home/Home';
import Login from '../pages/login/Login';

interface MainRoutesProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const MainRoutes: React.FC<MainRoutesProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/library" element={<Library />} />
      <Route path="/login" element={<Login isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
    </Routes>
  );
};