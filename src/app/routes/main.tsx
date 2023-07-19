import React from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { Library } from '../pages/deleteThisLater/DeleteMeLater';
import { Home } from '../pages/home/Home';
import Login from '../pages/login/Login';
import Register from '../pages/Register/Register';
import { NotFound } from '..//pages/NotFound/NotFound';

interface MainRoutesProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onUpdateToken: (jwt: string) => void;
  isLoggedIn: boolean;
}

export const MainRoutes = ({
  isDarkMode,
  toggleDarkMode,
  onUpdateToken,
  isLoggedIn,
}: MainRoutesProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (!isLoggedIn && location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, location, navigate]);

  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      {isLoggedIn && (
        <React.Fragment>
          <Route
            path="/"
            element={<Home onUpdateToken={onUpdateToken} />}
          />
          <Route path="/library" element={<Library />} />
        </React.Fragment>
      )}
      {!isLoggedIn && (
        <React.Fragment>
          <Route
            path="/"
            element={
              <Login
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                onUpdateToken={onUpdateToken}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
              />
            }
          />
        </React.Fragment>
      )}
    </Routes>
  );
};
