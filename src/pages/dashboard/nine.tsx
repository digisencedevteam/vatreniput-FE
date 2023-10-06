import { Helmet } from 'react-helmet-async';
import NineView from 'src/sections/nine/view';

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Nine</title>
      </Helmet>

      <NineView />
    </>
  );
}
