import {
  Box,
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const quizInfoData = [
  {
    title: 'Upoznajte Vatreni Kviz',
    content:
      'Vatreni Kviz je zanimljiv i dinamičan način testiranja vašeg znanja o Hrvatskoj nogometnoj reprezentaciji. Ovdje ćete pronaći pitanja koja će vas izazvati, ali i obogatiti vaše znanje o Vatrenima.',
  },
  {
    title: 'Kako pristupiti kvizovima?',
    content:
      'Da biste pristupili kvizovima, potrebno je biti registriran član digitalne platforme Vatrenog Almanaha. Nakon prijave, sve što trebate učiniti je odabrati kviz koji želite riješiti, i zabava može početi!',
  },
  {
    title: 'Pravila rješavanja kvizova',
    content:
      'Svaki kviz moguće je riješiti samo jednom po korisničkom računu. Vrijeme rješavanja kviza počinje čim započnete kviz. Ako vrijeme rješavanja pređe 1 sat, kviz će se automatski poslati. Ako izađete iz kviza, vrijeme se nastavlja, ali možete nastaviti tamo gdje ste stali unutar 1 sata.',
  },
  {
    title: 'Nagrade za riješene kvizove',
    content:
      'Najbolji kvizači imaju priliku osvojiti uzbudljive nagrade! U izvlačenje za nagrade ulaze korisnici koji su kviz riješili najtočnije u najkraćem vremenu. Osim toga, najbolji kvizači će biti nagrađeni i posebnim priznanjima unutar Vatrenog Almanaha.',
  },
];

const QuizRewardInfo = () => {
  return (
    <Container maxWidth='md'>
      <Box mt={4} mb={2} sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant='h4'>Vatreni Kvizovi</Typography>
      </Box>

      {quizInfoData.map((item, index) => (
        <Accordion sx={{ my: 2 }} key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant='h6'>{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default QuizRewardInfo;
