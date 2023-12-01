import { Helmet } from 'react-helmet-async';
import EightView from 'src/sections/eight/view';

const Page = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard: Eight</title>
      </Helmet>

      <EightView />
    </>
  );
};
