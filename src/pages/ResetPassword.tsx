import { Helmet } from 'react-helmet-async';
import ResetPasswordView from 'src/sections/reset-password/view';

export default function ResetPassword() {
    return (
        <>
            <Helmet>
                <title> Nova Lozinka</title>
            </Helmet>
            <ResetPasswordView />
        </>
    );
}
