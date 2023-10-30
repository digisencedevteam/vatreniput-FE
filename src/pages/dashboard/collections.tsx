import { Helmet } from 'react-helmet-async';
import { CollectionView } from 'src/sections/two/view';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Dashboard: Kolekcija</title>
      </Helmet>

      <CollectionView />
    </>
  );
}
