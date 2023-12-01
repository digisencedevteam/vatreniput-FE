import { Helmet } from 'react-helmet-async';
import { JwtRegisterView } from 'src/sections/auth/jwt';

const RegisterPage = () => {
  return (
    <>
      <Helmet>
        <title>Registracija na Vatreni Put</title>
      </Helmet>

      <JwtRegisterView />
    </>
  );
};
export default RegisterPage;
