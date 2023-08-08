import { Helmet } from 'react-helmet-async';
import { useAuthContext } from 'src/auth/hooks';
import ProfileView from 'src/sections/profile/view';

export default function Page() {
  const user = useAuthContext();
  return (
    <>
      <Helmet>
        <title> Dashboard: Six</title>
      </Helmet>

      <ProfileView />
    </>
  );
}
