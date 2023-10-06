import { Helmet } from 'react-helmet-async';
import ForgotPasswordView from 'src/sections/forgot-password/view';

export default function ForgotPassword() {
    return (
        <>
            <Helmet>
                <title> Resetiraj Lozinku</title>
            </Helmet>
            <ForgotPasswordView />
        </>
    );
}
