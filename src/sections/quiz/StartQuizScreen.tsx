import {
  Typography,
  Button,
  Snackbar,
  Alert,
  useMediaQuery,
  Container,
} from '@mui/material';
import { Quiz } from './types';
import { useSettingsContext } from 'src/components/settings';

interface StartQuizScreenProps {
  quiz: Quiz | null;
  startQuiz: () => void;
}
const StartQuizScreen = ({ quiz, startQuiz }: StartQuizScreenProps) => {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const settings = useSettingsContext();

  return (
    <>
      <img
        src={quiz?.thumbnail}
        alt='Quiz'
        style={{ maxWidth: isMobile ? '100%' : '45%', borderRadius: 10 }}
      />
      <Typography
        variant='h5'
        style={{
          textTransform: 'uppercase',
          fontWeight: 'bold',
          margin: 30,
          textAlign: 'center',
        }}
      >
        {quiz?.title}
      </Typography>
      <Snackbar open={true} autoHideDuration={6000}>
        <Alert severity='warning'>
          <Typography variant='caption'>
            Nagrađuju se korisnici s najviše točnih rješenja u najkraćem
            vremenu. Vrijeme prolazi iako izađeš iz kviza tako da se zatvaranje
            kviza NE preporuča!
          </Typography>
        </Alert>
      </Snackbar>
      <Typography variant='caption' sx={{ width: '90%', textAlign: 'center' }}>
        {quiz?.description}
      </Typography>
      <Button
        variant='contained'
        color='primary'
        onClick={startQuiz}
        style={{ marginTop: '20px', width: '50%' }}
      >
        Start Quiz
      </Button>
    </>
  );
};

export default StartQuizScreen;
