import { useEffect, useState, useCallback, useMemo } from 'react';
import axios, { endpoints } from 'src/utils/axios';
import { AuthContext } from './auth-context';
import { isValidToken, setSession } from './utils';
import { AuthUserType } from '../../types';
import { FormValues } from 'src/types';
import { LoadingScreen } from 'src/components/loading-screen';

const STORAGE_KEY = 'accessToken';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<AuthUserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const initialize = async () => {
    try {
      console.log('Initializing...');
      let accessToken = sessionStorage.getItem(STORAGE_KEY);
      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        const response = await axios.get(endpoints.auth.me);
        setUser(response.data.user);
        console.log('User set after valid access token', response.data.user);
      } else {
        const refreshResponse = await axios.post(endpoints.auth.refreshToken);
        accessToken = refreshResponse.data.accessToken;
        setSession(accessToken);
        setUser(refreshResponse.data.user);
        console.log('User set after refresh token', refreshResponse.data.user);
      }
    } catch (error) {
      console.error('Initialization error:', error);
      sessionStorage.removeItem(STORAGE_KEY);
      setUser(null);
    } finally {
      setLoading(false);
      setIsInitialized(true);
      console.log('Initialization finally block reached');
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const data = { email, password };
    const response = await axios.post(endpoints.auth.login, data);
    setSession(response.data.accessToken);
    setUser(response.data.user);
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
      const response = await axios.post(endpoints.auth.register + code, data);
      sessionStorage.setItem(STORAGE_KEY, response.data.accessToken);
      setUser(response.data.user);
    },
    []
  );

  const logout = useCallback(async () => {
    setSession(null);
    setUser(null);
  }, []);

  const updateUser = useCallback(
    async (userData: FormValues) => {
      if (user) {
        const response = await axios.put(
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
      login,
      register,
      logout,
      updateUser,
    }),
    [user, loading, login, register, logout, updateUser, isInitialized]
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
