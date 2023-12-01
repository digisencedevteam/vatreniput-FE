import { Helmet } from 'react-helmet-async';
import { VerifyEmailView } from 'src/sections/auth/verify-view';

const VerifyEmailPage = () => {
  return (
    <>
      <Helmet>
        <title>Potvrda Email Adrese</title>
      </Helmet>

      <VerifyEmailView />
    </>
  );
};
export default VerifyEmailPage;
