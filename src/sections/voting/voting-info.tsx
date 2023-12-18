import {
  Box,
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'src/routes/hooks';

const votingInfoData = [
  {
    title: 'Upoznajte Vatreni Glasanje',
    content:
      'Vatreni Glasanje omogućuje vam da glasate za svoje omiljene igrače u Hrvatskoj nogometnoj reprezentaciji. Ovdje možete izraziti svoje mišljenje i vidjeti koji igrači su najpopularniji među navijačima za svaku poziciju na terenu.',
  },
  {
    title: 'Kako sudjelovati u glasanju?',
    content:
      'Da biste sudjelovali u glasanju, potrebno je biti registriran član digitalne platforme Vatrenog Almanaha. Nakon prijave, možete pristupiti sekciji za glasanje i izraziti svoj glas za igrače po vašem izboru.',
  },
  {
    title: 'Pravila glasanja',
    content:
      'Svaki korisnik može glasati samo jednom po glasanju. Odaberite igrača za svaku poziciju i potvrdite svoj izbor. Jednom kada glasate, ne možete promijeniti svoj izbor. Rezultati glasanja se ažuriraju u stvarnom vremenu i vidljivi su svim korisnicima.',
  },
  {
    title: 'Značaj vašeg glasa',
    content:
      'Vaš glas pomaže u kreiranju najpopularnije postave Vatrenih. Kroz glasanje, zajednica navijača zajedno odlučuje koji su igrači zaslužili posebno priznanje. Uživajte u sudjelovanju i vidite kako vaši favoriti stoje među ostalim navijačima.',
  },
];

const VotingRewardInfo = () => {
  const history = useRouter();
  const handleGoBack = () => {
    history.back();
  };
  return (
    <Container maxWidth='md'>
      <Box
        mt={4}
        mb={2}
        sx={{ textAlign: 'center', marginBottom: 4 }}
      >
        <Typography variant='h4'>Vatreni Glasanja</Typography>
      </Box>

      {votingInfoData.map((item, index) => (
        <Accordion
          sx={{ my: 2 }}
          key={index}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant='h6'>{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      <Button
        variant='contained'
        color='primary'
        onClick={handleGoBack}
        sx={{ mt: 2 }}
      >
        Povratak
      </Button>
    </Container>
  );
};

export default VotingRewardInfo;
