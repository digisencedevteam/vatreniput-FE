import { Helmet } from 'react-helmet-async';
import OneView from 'src/sections/one/view';
import { DesktopViewOne } from 'src/sections/one/view-desktop';

export default function Page() {
  const isDesktop = window.innerWidth > 1100;

  return (
    <>
      <Helmet>
        <title> Dashboard: One</title>
      </Helmet>

      {isDesktop ? <DesktopViewOne /> : <OneView />}
    </>
  );
}
