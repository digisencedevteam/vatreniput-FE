import { Helmet } from 'react-helmet-async';
import PrivacyPolicy from 'src/sections/policy/privacy-policy-view';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Politika Privatnosti</title>
      </Helmet>

      <PrivacyPolicy />
    </>
  );
};
export default PrivacyPolicyPage;
