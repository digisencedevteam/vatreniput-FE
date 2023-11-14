import { useEffect } from 'react';
import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { useAuthContext } from '../hooks';
import { LoadingScreen } from 'src/components/loading-screen';

type Props = {
  children: React.ReactNode;
};

const GuestGuard = ({ children }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || paths.dashboard.root;
  const { authenticated, initializing } = useAuthContext();

  useEffect(() => {
    if (!initializing && authenticated) {
      if (authenticated) {
        router.replace(returnTo);
      }
    }
  }, [authenticated, initializing, returnTo, router]);

  if (initializing) {
    return <LoadingScreen />;
  }
  return <>{children}</>;
};
export default GuestGuard;
