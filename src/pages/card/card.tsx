import { Helmet } from 'react-helmet-async';
import { CardView } from 'src/sections/card/card.view';

export default function CardPage() {
  return (
    <>
      <Helmet>
        <title>Detalji sličice</title>
      </Helmet>

      <CardView />
    </>
  );
}
