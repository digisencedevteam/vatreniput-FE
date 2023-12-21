import { m } from 'framer-motion';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { RouterLink } from 'src/routes/components';
import { MotionContainer, varBounce } from 'src/components/animate';
import { PageNotFoundIllustration } from 'src/assets/illustrations';

const NotFoundView = () => {
  return (
    <MotionContainer>
      <m.div variants={varBounce().in}>
        <Typography
          variant='h3'
          sx={{ mb: 2 }}
        >
          Nažalost, stranica nije pronađena!
        </Typography>
      </m.div>
      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>
          Nažalost, nismo mogli pronaći stranicu koju tražite. Možda ste
          pogrešno utipkali URL?
        </Typography>
      </m.div>
      <m.div variants={varBounce().in}>
        <PageNotFoundIllustration
          sx={{
            height: 260,
            my: { xs: 5, sm: 10 },
          }}
        />
      </m.div>
      <Button
        component={RouterLink}
        href='/'
        size='large'
        variant='contained'
      >
        Povratak na početnu
      </Button>
    </MotionContainer>
  );
};
export default NotFoundView;
