import { Helmet } from 'react-helmet-async';
import { useResponsive } from 'src/hooks/use-responsive';
import OneView from 'src/sections/one/view';
import { DesktopViewOne } from 'src/sections/one/view-desktop';

export default function Page() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Dashboard: One</title>
      </Helmet>

      {isDesktop ? <DesktopViewOne /> : <OneView />}
    </>
  );
}
