import { Helmet } from 'react-helmet-async';
import SevenView from 'src/sections/seven/view';

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Seven</title>
      </Helmet>

      <SevenView />
    </>
  );
}
