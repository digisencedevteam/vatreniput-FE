import {
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from '@mui/material';
import ScoreIcon from '@mui/icons-material/EmojiEvents';
import TimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from 'react-router-dom';
import { Quiz } from './types';
import { MotionContainer, varBounce, varFade } from 'src/components/animate';

interface EndQuizScreenProps {
  quiz: Quiz | null;
  score: number;
  elapsedTime: number;
}

const EndQuizScreen = ({ quiz, score, elapsedTime }: EndQuizScreenProps) => {
  const navigate = useNavigate();
  const slideVariants = varFade();
  const bounceVariants = varBounce();
  const imageUrl =
    score > 30
      ? 'https://res.cloudinary.com/dzg5kxbau/image/upload/v1695908111/vesela3_elqpvf.png'
      : 'https://res.cloudinary.com/dzg5kxbau/image/upload/v1695908375/vatroslav_4_o2w8wm.png';

  const scoreEmoji = score > 90 ? '🔥' : '';
  let feedbackMessage = '';

  if (score > 90) {
    feedbackMessage =
      'Bravo, pravi navijač! Tvoje znanje je impresivno kao pobjeda u zadnjoj minuti!';
  } else if (score > 50) {
    feedbackMessage =
      'Dobar posao! Ti si pravi ljubitelj nogometa, samo nastavi tako!';
  } else {
    feedbackMessage =
      'Ne brini, svaka utakmica je nova prilika. Uči i navijaj dalje!';
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      mt={4}
    >
      <MotionContainer variants={slideVariants.inUp}>
        <CardMedia
          component='img'
          image={imageUrl}
          alt='Quiz result image'
          style={{ maxWidth: '300px' }}
        />
      </MotionContainer>

      <Typography
        variant='h6'
        style={{ textAlign: 'center', width: '80%', margin: '20px' }}
      >
        {feedbackMessage}
      </Typography>
      <MotionContainer variants={bounceVariants.inUp}>
        <Grid
          container
          spacing={2}
          justifyContent='center'
        >
          <Grid
            item
            xs={12}
          >
            <Card
              variant='outlined'
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ScoreIcon color='primary' />
              <CardContent>
                <Typography variant='h6'>{`Rezultat: ${Math.round(
                  score
                )}% ${scoreEmoji}`}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Card
              variant='outlined'
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TimeIcon color='primary' />
              <CardContent>
                <Typography variant='h6'>{`Vrijeme: ${elapsedTime} sekundi`}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </MotionContainer>

      <Button
        variant='contained'
        color='primary'
        onClick={() => navigate(-1)}
        style={{ marginTop: '20px', padding: '10px 20px', minWidth: '175px' }}
      >
        Završi
      </Button>
    </Box>
  );
};

export default EndQuizScreen;
