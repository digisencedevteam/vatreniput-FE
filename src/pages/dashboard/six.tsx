import { Helmet } from 'react-helmet-async';
import SixView from 'src/sections/six/view';

const Page = () => {
  return (
    <>
      <Helmet>
        <title> Dashboard: Six</title>
      </Helmet>

      <SixView />
    </>
  );
};
export default Page;
