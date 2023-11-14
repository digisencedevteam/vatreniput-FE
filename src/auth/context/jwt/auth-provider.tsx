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

  const initialize = async () => {
    try {
      let accessToken = sessionStorage.getItem('accessToken');
      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        const response = await axiosInstance.get(endpoints.auth.me);
        setUser(response.data.user);
      } else {
        const refreshResponse = await axiosInstance.get(
          endpoints.auth.refreshToken
        );
        if (refreshResponse.data.accessToken) {
          accessToken = refreshResponse.data.accessToken;
          setSession(accessToken);
          const userResponse = await axiosInstance.get(endpoints.auth.me);
          updateUserContext(userResponse.data.user);
        } else {
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Initialization error:', error);
      sessionStorage.removeItem('accessToken');
      setUser(null);
    } finally {
      setLoading(false);
      setIsInitialized(true);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    setSession(user?.accessToken);
  }, [user]);

  const login = useCallback(async (email: string, password: string) => {
    const data = { email, password };
    const response = await axiosInstance.post(endpoints.auth.login, data);
    setSession(response.data.accessToken);
    setUser(response.data.user);
  }, []);

  const updateUserContext = (newUser: any) => {
    setUser(newUser);
  };

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
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  const updateUser = useCallback(
    async (userData: FormValues) => {
      if (user) {
        const response = await axiosInstance.put(
          `${endpoints.user.user}${user._id}`,
          userData
        );
        setUser(response.data.user);
      }
    },
    [user]
  );

  const memoizedValue = useMemo(
    () => ({
      user,
      method: 'jwt',
      loading,
      authenticated: !!user,
      unauthenticated: !user,
      initializing: !isInitialized,
      updateUserContext,
      login,
      register,
      logout,
      updateUser,
    }),
    [
      user,
      loading,
      login,
      register,
      logout,
      updateUser,
      isInitialized,
      updateUserContext,
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
