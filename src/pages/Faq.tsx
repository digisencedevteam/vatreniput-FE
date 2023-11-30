import { Helmet } from 'react-helmet-async';
import FaqView from 'src/sections/faq/view';
import { FAQs } from 'src/lib/constants';

const Faq = () => {
  return (
    <>
      <Helmet>
        <title>Često Postavljana pitanja - HNS Almanah</title>
      </Helmet>
      <FaqView faqs={FAQs} />
    </>
  );
};
export default Faq;
