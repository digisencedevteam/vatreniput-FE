import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Quiz } from './types';
import { useNavigate } from 'react-router-dom';

interface EndQuizScreenProps {
  quiz: Quiz | null;
  score: number;
  elapsedTime: number;
}

const EndQuizScreen = ({ quiz, score, elapsedTime }: EndQuizScreenProps) => {
  const navigate = useNavigate();
  return (
    <>
      <Typography variant='h6'>{`Rezultat: ${Math.round(score)}%`}</Typography>
      <Typography variant='caption'>
        {`Vrijeme: ${elapsedTime} sekundi`}
      </Typography>
      <Button
        component={Link}
        to={'/dashboard/three'}
        variant='contained'
        color='primary'
        style={{ marginTop: '20px' }}
        onClick={() => navigate(-1)}
      >
        Završi
      </Button>
    </>
  );
};

export default EndQuizScreen;
