import { Helmet } from 'react-helmet-async';
import AlbumInvalidView from 'src/sections/error/album-not-valid-view';

const InvalidAlbumPage = () => {
  return (
    <>
      <Helmet>
        <title>404 - album nije pronađen</title>
      </Helmet>

      <AlbumInvalidView />
    </>
  );
};
export default InvalidAlbumPage;
