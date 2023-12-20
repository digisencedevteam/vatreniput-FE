import { Helmet } from 'react-helmet-async';
import UsagePolicy from 'src/sections/policy/usage-poicy-view';

const UsagePolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Pravila Korištenja</title>
      </Helmet>

      <UsagePolicy />
    </>
  );
};
export default UsagePolicyPage;
