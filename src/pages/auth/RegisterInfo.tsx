import { Helmet } from 'react-helmet-async';
import { RegisterInfoView } from 'src/sections/auth/register-info';

const RegisterInfo = () => {
  return (
    <>
      <Helmet>
        <title>Potvrdita Registracije</title>
      </Helmet>

      <RegisterInfoView />
    </>
  );
};
export default RegisterInfo;
