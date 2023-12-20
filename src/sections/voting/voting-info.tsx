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
import { votingInfoData } from 'src/lib/constants';

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
