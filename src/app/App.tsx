import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MainRoutes } from './routes/main';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../lib/theme';
import { AuthorizationContextProvider } from '../lib/context/AuthorizationContext';
import { token, updateToken } from '../lib/config';
import { CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { fetchUserData } from '../lib/api/auth/authApi';

const initialUser = {
  _id: '',
  email: '',
  username: '',
};
const MainWrapper = styled('div')({
  color: 'darkslategray',
  background: '#F6F7F9',
  boxSizing: 'border-box',
});

export const App = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const [user, setUser] = React.useState(initialUser);
  const [isLoading, setIsLoading] = React.useState(true);

  const theme = React.useMemo(
    () => (darkMode ? darkTheme : lightTheme),
    [darkMode]
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const loadUser = async () => {
    if (!token) {
      setUser(initialUser);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const user = await fetchUserData();
      setUser(user);
    } catch (error) {}
    setIsLoading(false);
  };

  const onUpdateToken = async (jwt: string) => {
    updateToken(jwt);
    await loadUser();
  };

  React.useEffect(() => {
    loadUser();
  }, []);

  React.useEffect(() => {
    if (user) console.log(user);
  }, [user]);

  if (isLoading) {
    return (
      <MainWrapper>
        <CircularProgress />
      </MainWrapper>
    );
  }

  const isLoggedIn = !!user?._id;

  return (
    <AuthorizationContextProvider initialUser={user}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <MainRoutes
            isDarkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            onUpdateToken={onUpdateToken}
            isLoggedIn={isLoggedIn}
          />
        </BrowserRouter>
      </ThemeProvider>
    </AuthorizationContextProvider>
  );
};
