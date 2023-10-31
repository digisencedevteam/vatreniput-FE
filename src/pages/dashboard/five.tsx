import { Helmet } from 'react-helmet-async';
import { FiveView } from 'src/sections/five/view';

const Page = () => {
  return (
    <>
      <Helmet>
        <title> Dashboard: Five</title>
      </Helmet>

      <FiveView />
    </>
  );
};
export default Page;
