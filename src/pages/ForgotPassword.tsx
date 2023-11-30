import { Helmet } from 'react-helmet-async';
import ForgotPasswordView from 'src/sections/forgot-password/view';

const ForgotPassword = () => {
  return (
    <>
      <Helmet>
        <title>Resetiraj Lozinku</title>
      </Helmet>
      <ForgotPasswordView />
    </>
  );
};
export default ForgotPassword;
