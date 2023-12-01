import { Helmet } from 'react-helmet-async';
import { CardView } from 'src/sections/card/card.view';

const CardPage = () => {
  return (
    <>
      <Helmet>
        <title>Detalji sličice</title>
      </Helmet>

      <CardView />
    </>
  );
};
export default CardPage;
