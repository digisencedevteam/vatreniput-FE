import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { EmailInboxIcon } from 'src/assets/icons';
import { paths } from 'src/routes/paths';

export const VerifyEmailView = () => {
  const navigate = useNavigate();
  const renderHead = (
    <>
      <EmailInboxIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant='h3'>Email Adresa Potvrđena!</Typography>

        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          Hvala vam na uspješnoj registraciji email-a. Sada sljedi zabavan dio -
          uživajte u našoj plaftofmi!
        </Typography>
        <Button color='inherit' onClick={() => navigate(paths.auth.jwt.login)}>
          Prijavi Se
        </Button>
      </Stack>
    </>
  );

  return <>{renderHead}</>;
};
