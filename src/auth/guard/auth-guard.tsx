import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks';
import { paths } from 'src/routes/paths';

type Props = {
  children: React.ReactNode;
};

const AuthGuard = ({ children }: Props) => {
  const navigate = useNavigate();
  const { authenticated, method, initializing } = useAuthContext();

  useEffect(() => {
    if (!authenticated && !initializing) {
      const loginPath = method === 'jwt' ? paths.auth.jwt.login : '/login';
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();
      navigate(`${loginPath}?${searchParams}`, { replace: true });
    }
  }, [authenticated, initializing, method, navigate]);

  return <>{children}</>;
};
export default AuthGuard;
