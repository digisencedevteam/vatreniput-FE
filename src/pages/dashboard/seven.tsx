import { Helmet } from 'react-helmet-async';
import SevenView from 'src/sections/seven/view';

const Page = () => {
  return (
    <>
      <Helmet>
        <title> Dashboard: Seven</title>
      </Helmet>

      <SevenView />
    </>
  );
};
export default Page;
