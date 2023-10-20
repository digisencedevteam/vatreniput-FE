import {
  Typography,
  Button,
  Grid,
  LinearProgress,
  Fade,
  Box,
  IconButton,
  Hidden,
  useTheme,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Question } from './types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ExitConfirmationModal from './exit-confirmation-dialog';

interface QuestionScreenProps {
  currentQuestion: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  title: string;
  selectedOption: string | null;
  handleAnswerSelection: (option: string) => void;
  handlePreviousQuestion: () => void;
  handleNextQuestion: () => void;
  handleSubmitAnswers: () => void;
  elapsedTime: number;
  quizId: string
}

const QuestionScreen = ({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  selectedOption,
  title,
  handleAnswerSelection,
  handlePreviousQuestion,
  handleNextQuestion,
  quizId
}: QuestionScreenProps) => {
  const theme = useTheme();
  const progress =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const storedStartTime = localStorage.getItem(`quizStartTime_${quizId}`);

    if (storedStartTime) {
      setQuizStartTime(parseInt(storedStartTime, 10));
    } else {
      const currentStartTime = Date.now();
      setQuizStartTime(currentStartTime);

      localStorage.setItem(`quizStartTime_${quizId}`, currentStartTime.toString());
    }
  }, [quizId]);

  useEffect(() => {
    if (quizStartTime) {
      const initialElapsedTime = Math.floor((Date.now() - quizStartTime) / 1000);
      setElapsedTime(initialElapsedTime);

      const intervalId = setInterval(() => {
        const newElapsedTime = Math.floor((Date.now() - quizStartTime) / 1000);
        setElapsedTime(newElapsedTime);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [quizStartTime]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleExitConfirmation = () => {
    setShowModal(false);
    navigate('/dashboard/three');
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems={'center'}
      justifyContent="center"
      m={0}
      maxWidth={'500px'}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={1}
      >
        <Grid item width={'100%'} padding={0}>
          <Grid container alignItems="center">
            <Grid item>
              <IconButton
                edge="start"
                color="primary"
                aria-label="back to dashboard"
                onClick={(e: any) => {
                  e.preventDefault();
                  setShowModal(true);
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Grid>
            <Grid item xs>
              <Typography variant="h4">{title}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item width={'100%'} m={1} padding={0}>
          <Typography
            variant="h6"
            style={{
              fontWeight: 'bold',
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            Vrijeme proteklo {formatTime(elapsedTime)}
          </Typography>
        </Grid>
        <Grid item width={'100%'} m={1} padding={0}>
          <Typography variant="h5">
            Pitanje {currentQuestionIndex + 1} / {totalQuestions}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ width: '97%' }}
          />
        </Grid>
      </Grid>

      <Grid
        container
        item
        direction="column"
        justifyContent={'center'}
        alignItems={'center'}
        m={0}
        sx={{
          backgroundColor: theme.palette.background.quiz,
          color: '#000',
          borderRadius: 1,
        }}
      >
        <Grid item textAlign={'center'}>
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>
            {currentQuestion.text}
          </Typography>
        </Grid>
        <Box sx={{ mt: '3%' }}>
          {currentQuestion.options.map((option) => (
            <Grid item key={option}>
              <Button
                variant={
                  selectedOption === option ? 'contained' : 'outlined'
                }
                color="primary"
                sx={{
                  borderRadius: '6px',
                  color:
                    selectedOption === option ? 'white' : 'inherit',
                  width: '13rem',
                  textAlign: 'center',
                  margin: 1,
                }}
                onClick={() => handleAnswerSelection(option)}
              >
                {selectedOption === option ? (
                  <Fade in={true} timeout={650}>
                    <SportsSoccerIcon
                      sx={{ marginRight: 1, fontSize: '20px' }}
                    />
                  </Fade>
                ) : null}
                {option}
              </Button>
            </Grid>
          ))}
        </Box>

        <Grid item sx={{ marginTop: 2 }}>
          <img
            src={'/assets/images/kviz.png'}
            alt="Question Illustration"
            style={{
              width: '100%',
              maxHeight: '200px',
              objectFit: 'contain',
            }}
          />
        </Grid>

        <Grid
          container
          item
          justifyContent="space-between"
          style={{ width: '60%', margin: '20px' }}
        >
          <Hidden smDown>
            <Button
              variant="outlined"
              color="primary"
              onClick={handlePreviousQuestion}
            >
              Prošlo pitanje
            </Button>
          </Hidden>
          <Hidden smUp>
            <Button
              variant="outlined"
              color="primary"
              onClick={handlePreviousQuestion}
            >
              <ArrowBackIcon />
            </Button>
          </Hidden>

          <Hidden smDown>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextQuestion}
            >
              Sljedeće pitanje
            </Button>
          </Hidden>
          <Hidden smUp>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextQuestion}
            >
              <ArrowForwardIcon />
            </Button>
          </Hidden>
        </Grid>
      </Grid>
      <ExitConfirmationModal
        open={showModal}
        onClose={handleModalClose}
        onConfirm={handleExitConfirmation}
      />
    </Grid>
  );
};

export default QuestionScreen;
