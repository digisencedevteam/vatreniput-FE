import { m } from 'framer-motion';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { RouterLink } from 'src/routes/components';
import { MotionContainer, varBounce } from 'src/components/animate';
import { useRouter } from 'src/routes/hooks';

const UsagePolicy = () => {
  const navigation = useRouter();
  return (
    <MotionContainer>
      <m.div variants={varBounce().in}>
        <Typography
          variant='h4'
          gutterBottom
          sx={{ fontWeight: 'bold', color: 'primary.main' }}
        >
          Vatreni Put - Politika Privatnosti
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography paragraph>
          1. Uvod Dobrodošli u aplikaciju Vatreni Put, u vlasništvu Digisence
          Agency (pravno ime DigiSence LTD, registrirana adresa: 20-22 Wenlock
          Road, London, Engleska, N1 7GU, status tvrtke: Aktivna, privatna
          tvrtka s ograničenom odgovornošću registrirana u Londonu, UK). Ova
          Politika privatnosti objašnjava kako prikupljamo, koristimo i dijelimo
          vaše osobne podatke prilikom korištenja aplikacije Vatreni Put.
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography paragraph>
          2. Prikupljanje i korištenje osobnih podataka Vaši osobni podaci
          prikupljaju se samo za funkcionalnosti aplikacije. To uključuje, ali
          nije ograničeno na, vaše ime, e-mail adresu i podatke koje unosite
          prilikom korištenja aplikacije. Ne koristimo treće strane kolačiće.
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography paragraph>
          3. Svrha korištenja podataka Osobni podaci koriste se isključivo za
          pružanje i poboljšanje funkcionalnosti aplikacije Vatreni Put. Ne
          dijelimo vaše podatke s trećim stranama osim ako to nije nužno za
          pružanje usluga aplikacije ili po zakonskom zahtjevu.
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography paragraph>
          4. Sigurnost podataka Predani smo zaštiti sigurnosti vaših osobnih
          podataka. Koristimo različite sigurnosne tehnologije i mjere kako
          bismo zaštitili vaše podatke od neovlaštenog pristupa, upotrebe ili
          otkrivanja.
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography paragraph>
          5. Vaša prava Imate pravo pristupiti, ispraviti, brisati ili
          ograničiti korištenje vaših osobnih podataka. Ukoliko imate bilo
          kakvih pitanja ili zahtjeva vezanih za vaše osobne podatke, molimo vas
          da se obratite na [email adresa za kontakt].
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography paragraph>
          6. Promjene politike privatnosti Ova politika privatnosti može se
          povremeno ažurirati. O svakoj promjeni bit ćete obaviješteni putem
          aplikacije ili e-mailom.
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography paragraph>
          7. Kontakt Za bilo kakva pitanja ili zabrinutosti u vezi s ovom
          politikom privatnosti, molimo kontaktirajte Digisence Agency na [email
          adresa za kontakt].
        </Typography>
      </m.div>

      <Button
        component={RouterLink}
        onClick={() => {
          navigation.back();
        }}
        size='large'
        variant='contained'
        sx={{
          mt: 3,
          backgroundColor: 'primary',
          '&:hover': { backgroundColor: 'error.main' },
        }}
      >
        Povratak
      </Button>
    </MotionContainer>
  );
};

export default UsagePolicy;
