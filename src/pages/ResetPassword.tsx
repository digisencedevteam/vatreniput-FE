import { Helmet } from 'react-helmet-async';
import ResetPasswordView from 'src/sections/reset-password/view';

const ResetPassword = () => {
  return (
    <>
      <Helmet>
        <title>Promjena lozinke</title>
      </Helmet>
      <ResetPasswordView />
    </>
  );
};
export default ResetPassword;
