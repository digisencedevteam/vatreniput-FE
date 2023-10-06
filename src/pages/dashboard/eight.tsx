import { Helmet } from 'react-helmet-async';
import EightView from 'src/sections/eight/view';

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Eight</title>
      </Helmet>

      <EightView />
    </>
  );
}
