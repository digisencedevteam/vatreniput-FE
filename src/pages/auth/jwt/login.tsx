import { Helmet } from 'react-helmet-async';
import { JwtLoginView } from 'src/sections/auth/jwt';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Prijava na Vatreni Put</title>
      </Helmet>

      <JwtLoginView />
    </>
  );
};
export default LoginPage;
