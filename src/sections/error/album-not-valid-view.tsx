import { m } from 'framer-motion';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { RouterLink } from 'src/routes/components';
import { MotionContainer, varBounce } from 'src/components/animate';
import { PageNotFoundIllustration } from 'src/assets/illustrations';
import Alert from '@mui/material/Alert';

const AlbumInvalidView = () => {
  return (
    <MotionContainer>
      <m.div variants={varBounce().in}>
        <Typography variant='h5' sx={{ mb: 2 }}>
          Album nije pronađen!
        </Typography>
      </m.div>
      <m.div variants={varBounce().in}>
        <Alert severity='error' sx={{ mb: 3 }}>
          Ipričavamo se ali naš sustav nije pronašao aktivni album preko vašeg
          QR koda. Molimo vas da još jednom provjerite vaš album i pokušate
          ponovno. Hvala!
        </Alert>
      </m.div>
      <m.div variants={varBounce().in}>
        <PageNotFoundIllustration
          sx={{
            height: 260,
            my: { xs: 5, sm: 10 },
          }}
        />
      </m.div>
      <Button component={RouterLink} href='/' size='large' variant='contained'>
        Prijavi se
      </Button>
    </MotionContainer>
  );
};
export default AlbumInvalidView;
