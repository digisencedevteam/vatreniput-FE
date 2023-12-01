import { Helmet } from 'react-helmet-async';
import NineView from 'src/sections/nine/view';

const Page = () => {
  return (
    <>
      <Helmet>
        <title> Dashboard: Nine</title>
      </Helmet>

      <NineView />
    </>
  );
};
export default Page;
