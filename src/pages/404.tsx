import { Helmet } from 'react-helmet-async';
import { NotFoundView } from 'src/sections/error';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title> 404 - stranica nije pronađena</title>
      </Helmet>

      <NotFoundView />
    </>
  );
};
export default NotFoundPage;
