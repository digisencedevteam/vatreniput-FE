import { Helmet } from 'react-helmet-async';
import { ThreeView } from 'src/sections/three/view';

const Page = () => {
  return (
    <>
      <Helmet>
        <title> Dashboard: Three</title>
      </Helmet>

      <ThreeView />
    </>
  );
};
export default Page;
