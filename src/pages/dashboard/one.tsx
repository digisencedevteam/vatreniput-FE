import { Helmet } from 'react-helmet-async';
// sections
import OneView from 'src/sections/one/view';
import { DesktopViewOne } from 'src/sections/one/view-desktop';

// ----------------------------------------------------------------------

export default function Page() {
  const isDesktop = window.innerWidth > 1100; // Or whatever breakpoint you consider as "desktop"

  return (
    <>
      <Helmet>
        <title> Dashboard: One</title>
      </Helmet>

      {isDesktop ? <DesktopViewOne /> : <OneView />}
    </>
  );
}
