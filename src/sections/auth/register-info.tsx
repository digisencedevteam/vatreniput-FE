import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { EmailInboxIcon } from 'src/assets/icons';
import { paths } from 'src/routes/paths';
import { useEffect, useState } from 'react';

export const RegisterInfoView = () => {
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(
        () => setTimeLeft(timeLeft - 1),
        1000
      );
      return () => clearTimeout(timerId);
    } else {
      navigate(paths.auth.jwt.login);
    }
  }, [timeLeft, navigate]);

  const renderHead = (
    <>
      <EmailInboxIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant='h3'>Potvrda Registracije</Typography>

        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          Hvala vam što ste se registrirali! Da biste nastavili,
          molimo vas da provjerite svoj email i potvrdite svoju
          adresu. Poslali smo vam email s poveznicom za potvrdu.
        </Typography>

        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          Ova kartica će se automatski zatvoriti za {timeLeft}{' '}
          sekundi.
        </Typography>

        <Button
          color='inherit'
          onClick={() => navigate(paths.auth.jwt.login)}
        >
          Prijavi Se
        </Button>
      </Stack>
    </>
  );

  return <>{renderHead}</>;
};
