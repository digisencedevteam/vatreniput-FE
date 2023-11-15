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
import { formatTime } from 'src/utils/format-time';
import DeleteModal from 'src/components/delete-modal/deleteModal';
import { paths } from 'src/routes/paths';

interface QuestionScreenProps {
  currentQuestion: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  title: string;
  selectedOption: string | null;
  handleAnswerSelection: (option: string) => void;
  handlePreviousQuestion: () => void;
  handleNextQuestion: () => void;
  quizId: string;
  startedTime: number;
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
  quizId,
  startedTime,
}: QuestionScreenProps) => {
  const quizDuration = 15 * 60;
  const theme = useTheme();
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (startedTime) {
      setQuizStartTime(startedTime);
    } else {
      const currentStartTime = Date.now();
      setQuizStartTime(currentStartTime);
    }
  }, [quizId, startedTime]);

  useEffect(() => {
    if (quizStartTime) {
      const intervalId = setInterval(() => {
        const currentTime = Date.now();
        const timeElapsed = Math.floor((currentTime - quizStartTime) / 1000);
        const timeRemaining = quizDuration - timeElapsed;
        if (timeRemaining >= 0) {
          setElapsedTime(timeRemaining);
        } else {
          clearInterval(intervalId);
          // TODO: Handle quiz timeout logic here (e.g., navigate to a different page or show a message)
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [quizStartTime, quizDuration]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const elapsedTime = calculateElapsedTime(startedTime);
  //     setElapsedTime(elapsedTime);
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, [startedTime]);

  // const calculateElapsedTime = (startedTime: number) => {
  //   const currentTime = new Date().getTime();
  //   const elapsedTime = Math.floor((currentTime - startedTime) / 60000);
  //   return elapsedTime;
  // };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleExitConfirmation = () => {
    setShowModal(false);
    navigate(paths.dashboard.quizzes);
  };

  return (
    <Grid
      container
      spacing={2}
      direction='column'
      alignItems={'center'}
      justifyContent='center'
      m={0}
      maxWidth={'500px'}
    >
      <Grid
        container
        direction='column'
        alignItems='center'
        spacing={1}
      >
        <Grid
          item
          width={'100%'}
          padding={0}
        >
          <Grid
            container
            alignItems='center'
          >
            <Grid item>
              <IconButton
                edge='start'
                color='primary'
                aria-label='back to dashboard'
                onClick={(e: any) => {
                  e.preventDefault();
                  setShowModal(true);
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Grid>
            <Grid
              item
              xs
            >
              <Typography variant='h4'>{title}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          width={'100%'}
          m={1}
          padding={0}
        >
          <Typography
            variant='h6'
            style={{
              fontWeight: 'bold',
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            Preostalo vrijeme: {formatTime(elapsedTime)}
          </Typography>
        </Grid>
        <Grid
          item
          width={'100%'}
          m={1}
          padding={0}
        >
          <Typography variant='h5'>
            Pitanje {currentQuestionIndex + 1} / {totalQuestions}
          </Typography>
          <LinearProgress
            variant='determinate'
            value={progress}
            sx={{ width: '97%' }}
          />
        </Grid>
      </Grid>

      <Grid
        container
        item
        direction='column'
        justifyContent={'center'}
        alignItems={'center'}
        m={0}
        sx={{
          backgroundColor: theme.palette.background.quiz,
          color: '#000',
          borderRadius: 1,
        }}
      >
        <Grid
          item
          textAlign={'center'}
        >
          <Typography
            variant='h6'
            style={{ fontWeight: 'bold' }}
          >
            {currentQuestion.text}
          </Typography>
        </Grid>
        <Box sx={{ mt: '3%' }}>
          {currentQuestion.options.map((option, index) => (
            <Grid
              item
              key={option}
            >
              <Button
                variant={
                  selectedOption === index.toString() ? 'contained' : 'outlined'
                }
                color='primary'
                sx={{
                  borderRadius: '6px',
                  color:
                    selectedOption === index.toString() ? 'white' : 'inherit',
                  width: '13rem',
                  textAlign: 'center',
                  margin: 1,
                }}
                onClick={() => handleAnswerSelection(index.toString())}
              >
                {selectedOption === index.toString() ? (
                  <Fade
                    in={true}
                    timeout={650}
                  >
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

        <Grid
          item
          sx={{ marginTop: 2 }}
        >
          <img
            src={'/assets/images/kviz.png'}
            alt='Question Illustration'
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
          justifyContent='space-between'
          style={{ width: '60%', margin: '20px' }}
        >
          <Hidden smDown>
            <Button
              variant='outlined'
              color='primary'
              onClick={handlePreviousQuestion}
            >
              Prošlo pitanje
            </Button>
          </Hidden>
          <Hidden smUp>
            <Button
              variant='outlined'
              color='primary'
              onClick={handlePreviousQuestion}
            >
              <ArrowBackIcon />
            </Button>
          </Hidden>

          <Hidden smDown>
            <Button
              variant='contained'
              color='primary'
              onClick={handleNextQuestion}
            >
              Sljedeće pitanje
            </Button>
          </Hidden>
          <Hidden smUp>
            <Button
              variant='contained'
              color='primary'
              onClick={handleNextQuestion}
            >
              <ArrowForwardIcon />
            </Button>
          </Hidden>
        </Grid>
      </Grid>
      <DeleteModal
        isOpen={showModal}
        onClose={handleModalClose}
        onConfirmDelete={handleExitConfirmation}
        modalText='Jeste li sigurni da želite izaći iz kviza? Vrijeme nastavlja teći iako izađeš!'
        confirmButtonText='Izađi'
      />
    </Grid>
  );
};

export default QuestionScreen;
