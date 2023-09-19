import { Helmet } from 'react-helmet-async';
//sectons
import FaqView from 'src/sections/faq/view';
import { FAQs } from 'src/lib/constants';
import ForgotPasswordView from 'src/sections/forgot-password/view';

// ----------------------------------------------------------------------

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
