import { Helmet } from 'react-helmet-async';
import AlbumInvalidView from 'src/sections/error/album-not-valid-view';

export default function InvalidAlbumPage() {
  return (
    <>
      <Helmet>
        <title> 404 Album</title>
      </Helmet>

      <AlbumInvalidView />
    </>
  );
}
