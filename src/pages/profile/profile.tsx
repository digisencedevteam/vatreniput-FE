import { Helmet } from 'react-helmet-async';
import ProfileView from 'src/sections/profile/view';

const Page = () => {
  return (
    <>
      <Helmet>
        <title> Dashboard: Six</title>
      </Helmet>

      <ProfileView />
    </>
  );
};
export default Page;
