import { Typography, Button, Alert, useMediaQuery } from '@mui/material';
import { Quiz } from './types';

interface StartQuizScreenProps {
  quiz: Quiz | null;
  startQuiz: () => void;
}
const StartQuizScreen = ({ quiz, startQuiz }: StartQuizScreenProps) => {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

  return (
    <>
      <img
        src={quiz?.thumbnail}
        alt='Quiz'
        style={{ maxWidth: isMobile ? '100%' : '45%', borderRadius: 10 }}
      />
      <Alert severity='info' sx={{ mt: 3, mb: 1, mx: isMobile ? 0 : 10 }}>
        <Typography variant='caption' textAlign={'center'}>
          Nagrađuju se korisnici s najviše točnih rješenja u najkraćem vremenu.
          <br />
          Vrijeme prolazi iako izađeš iz kviza tako da se zatvaranje kviza NE
          preporuča!
        </Typography>
      </Alert>
      <Typography
        variant='h5'
        sx={{
          textTransform: 'uppercase',
          fontWeight: 'bold',
          my: 5,
          mx: 0,
          textAlign: 'center',
        }}
      >
        {quiz?.title}
      </Typography>
      <Typography variant='caption' sx={{ width: '90%', textAlign: 'center' }}>
        {quiz?.description}
      </Typography>
      <Button
        variant='contained'
        color='primary'
        onClick={startQuiz}
        style={{ marginTop: 40, width: '50%' }}
      >
        Pokreni Kviz
      </Button>
    </>
  );
};

export default StartQuizScreen;
