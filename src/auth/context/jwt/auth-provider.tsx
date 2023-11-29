import { useEffect, useState, useCallback, useMemo } from 'react';
import { endpoints } from 'src/utils/axios';
import { AuthContext } from './auth-context';
import { isValidToken, setSession } from './utils';
import { AuthUserType } from '../../types';
import { FormValues } from 'src/types';
import { LoadingScreen } from 'src/components/loading-screen';
import axiosInstance from 'src/utils/axios';

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<AuthUserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const initialize = async () => {
    setLoading(true);

    try {
      let accessToken = sessionStorage.getItem('accessToken');
      if (accessToken && !isValidToken(accessToken)) {
        try {
          const refreshResponse = await axiosInstance.get(
            endpoints.auth.refreshToken
          );
          if (refreshResponse.data.accessToken) {
            accessToken = refreshResponse.data.accessToken;
            setSession(accessToken);
            const userResponse = await axiosInstance.get(endpoints.auth.me);
            setUser(userResponse.data.user);
            setIsUserAuthenticated(true);
          } else {
            setIsUserAuthenticated(false);
            sessionStorage.removeItem('accessToken');
          }
        } catch (refreshError) {
          setIsUserAuthenticated(false);
          sessionStorage.removeItem('accessToken');
          console.error('Refresh token error:', refreshError);
        }
      } else if (accessToken) {
        setSession(accessToken);
        const userResponse = await axiosInstance.get(endpoints.auth.me);
        setUser(userResponse.data.user);
        setIsUserAuthenticated(true);
      } else {
        try {
          const refreshResponse = await axiosInstance.get(
            endpoints.auth.refreshToken
          );
          if (refreshResponse.data.accessToken) {
            accessToken = refreshResponse.data.accessToken;
            setSession(accessToken);
            const userResponse = await axiosInstance.get(endpoints.auth.me);
            setUser(userResponse.data.user);
            setIsUserAuthenticated(true);
          } else {
            setIsUserAuthenticated(false);
            sessionStorage.removeItem('accessToken');
          }
        } catch (refreshError) {
          setIsUserAuthenticated(false);
          sessionStorage.removeItem('accessToken');
          console.error('Refresh token error:', refreshError);
        }
      }
    } catch (error) {
      console.error('Initialization error:', error);
      setIsUserAuthenticated(false);
      sessionStorage.removeItem('accessToken');
    } finally {
      setLoading(false);
      setIsInitialized(true);
    }
  };

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = { email, password };
    const response = await axiosInstance.post(endpoints.auth.login, data);
    setSession(response.data.accessToken);
    setUser(response.data.user);
    setIsUserAuthenticated(true);
  }, []);

  const updateUserContext = useCallback((newUser: any) => {
    setUser(newUser);
  }, []);

  const register = useCallback(
    async (
      email: string,
      password: string,
      firstName: string,
      lastName: string,
      username: string,
      code: string
    ) => {
      const data = { email, password, firstName, lastName, username, code };
      const response = await axiosInstance.post(
        endpoints.auth.register + code,
        data
      );
      sessionStorage.setItem('accessToken', response.data.accessToken);
      setUser(response.data.user);
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await axiosInstance.post(endpoints.auth.logout);
      setSession(null);
      setUser(null);
      setIsUserAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  const updateUser = useCallback(
    async (userData: FormValues) => {
      setIsUpdatingUser(true);
      if (user) {
        try {
          const response = await axiosInstance.put(
            `${endpoints.user.user}${user._id}`,
            userData
          );
          setUser(response.data.user);
        } catch (error) {
          console.error(error);
        } finally {
          setIsUpdatingUser(false);
        }
      }
    },
    [user]
  );

  const refreshUserData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(endpoints.auth.me);
      setUser(response.data.user);
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  }, []);

  const memoizedValue = useMemo(
    () => ({
      user,
      method: 'jwt',
      loading,
      authenticated: isUserAuthenticated,
      unauthenticated: !user,
      initializing: !isInitialized,
      isUpdatingUser: isUpdatingUser,
      refreshUserData,
      updateUserContext,
      login,
      register,
      logout,
      updateUser,
    }),
    [
      user,
      isUserAuthenticated,
      loading,
      isUpdatingUser,
      isInitialized,
      login,
      register,
      logout,
      updateUser,
      updateUserContext,
      refreshUserData,
    ]
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};
