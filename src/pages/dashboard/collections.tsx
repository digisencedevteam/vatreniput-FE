import { Helmet } from 'react-helmet-async';
import { CollectionView } from 'src/sections/two/view';

const Page = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard: Kolekcija</title>
      </Helmet>

      <CollectionView />
    </>
  );
};
export default Page;
