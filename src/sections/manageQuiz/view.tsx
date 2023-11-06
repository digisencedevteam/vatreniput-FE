import { useContext, useEffect, useState } from 'react';
import {
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Container,
  Grid,
  Box,
  Divider,
  Snackbar,
  Alert,
  IconButton,
  Collapse,
} from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import { AuthContext } from 'src/auth/context/jwt';
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { useParams } from 'react-router-dom';
import useFetchQuizzes from 'src/hooks/use-quiz-data';
import dayjs, { Dayjs } from 'dayjs';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { Quiz, Question } from '../quiz/types';
import { userRoles } from 'src/lib/constants';
import { useRouter } from 'src/routes/hooks';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LoadingScreen } from 'src/components/loading-screen';
import { paths } from 'src/routes/paths';

const ManageQuiz = () => {
  const [numQuestions, setNumQuestions] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quiz, setQuiz] = useState<Partial<Quiz>>({});
  const settings = useSettingsContext();
  const [tempOptions, setTempOptions] = useState<number | null>(null);
  const history = useNavigate();
  const auth = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [availableUntil, setAvailableUntil] = useState<Date | Dayjs | null>(
    null
  );
  const [submitted, setSubmitted] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState<string | null>(null);
  const {
    fetchUnresolvedQuizById,
    unresolvedQuiz,
    createOrUpdateQuiz,
    isLoadingUnresolved,
  } = useFetchQuizzes();
  const [showForm, setShowForm] = useState(true);
  const router = useRouter();
  const { quizId } = useParams();
  const [initialQuiz, setInitialQuiz] = useState<Partial<Quiz>>({});
  const hasChanges = () => {
    return JSON.stringify(quiz) !== JSON.stringify(initialQuiz);
  };

  useEffect(() => {
    if (quizId) {
      fetchUnresolvedQuizById(quizId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  useEffect(() => {
    if (!auth.user || auth.user.role !== userRoles.admin) {
      router.push(`${paths.dashboard.five}`);
    }
    if (unresolvedQuiz) {
      setQuiz(unresolvedQuiz);
      setInitialQuiz(unresolvedQuiz);
      const dateToEdit = dayjs(unresolvedQuiz.availableUntil);
      if (unresolvedQuiz && unresolvedQuiz.questions) {
        setNumQuestions(unresolvedQuiz.questions.length);
      } else {
        setNumQuestions(0);
      }
      setAvailableUntil(dateToEdit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unresolvedQuiz]);

  const handleSubmit = async () => {
    const result = await createOrUpdateQuiz(quiz, quizId);

    if (result.success) {
      setSubmitted(true);
    } else {
      setErrorSnackbar(result.error || 'An unknown error occurred');
    }
  };

  const handleSetQuestions = (num: number) => {
    if (num > 0) {
      setError(false);
      setQuiz({
        questions: Array.from({ length: num }, () => ({
          text: '',
          options: [],
          correctOption: 0,
        })),
      });
      setCurrentQuestionIndex(0);
    } else {
      setError(true);
    }
  };

  const handleSetOptionsForCurrentQuestion = (num: number) => {
    const newQuestions = [...(quiz.questions || [])];
    newQuestions[currentQuestionIndex].options = Array(num).fill('');
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleQuestionChange = (
    index: number,
    key: keyof Question,
    value: string | number | string[]
  ) => {
    const newQuestions = [...(quiz.questions || [])];
    newQuestions[index] = { ...newQuestions[index], [key]: value };
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleAddOption = (index: number) => {
    const newQuestions = [...(quiz.questions || [])];
    newQuestions[index].options = [...newQuestions[index].options, ''];
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleRemoveOption = (qIndex: number, optIndex: number) => {
    const newQuestions = [...(quiz.questions || [])];
    newQuestions[qIndex].options.splice(optIndex, 1);
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleAddQuestion = () => {
    const newQuestions = [
      ...(quiz.questions || []),
      {
        text: '',
        options: [],
        correctOption: 0,
      },
    ];
    setQuiz({ ...quiz, questions: newQuestions });
    setNumQuestions((prev) => (prev ? prev + 1 : 1));
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = [...(quiz.questions || [])];
    newQuestions.splice(index, 1);
    setQuiz({ ...quiz, questions: newQuestions });
    setCurrentQuestionIndex((prev) =>
      prev === newQuestions.length ? prev - 1 : prev
    );
    setNumQuestions((prev) => (prev ? prev - 1 : 0));
  };

  if (!quiz.questions) {
    return (
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isLoadingUnresolved ? (
          <LoadingScreen />
        ) : (
          <>
            <Grid item sx={{ m: 3, alignSelf: 'start' }}>
              <IconButton
                edge='start'
                color='primary'
                aria-label='back to dashboard'
                onClick={() => {
                  router.push('/dashboard/five');
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Grid>
            <Typography variant='h3'>Koliko pitanja želite u kvizu?</Typography>
            <TextField
              type='number'
              label='Broj pitanja'
              required
              error={error}
              helperText={error ? 'Molimo unesite broj pitanja' : ''}
              sx={{ width: '90%', my: 2 }}
              onChange={(e) => setNumQuestions(parseInt(e.target.value, 10))}
            />
            <Box>
              <Button
                variant='outlined'
                onClick={() => handleSetQuestions(numQuestions!)}
              >
                Postavi pitanja
              </Button>
            </Box>
          </>
        )}
      </Container>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isFormValid = () => {
    return (
      quiz.title &&
      quiz.description &&
      quiz.questions?.every((q) => q.text && q.options.length > 0)
    );
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box>
        <Typography variant='h4' textAlign={'center'} m={1}>
          {' '}
          {quizId ? 'Ažuriraj' : 'Stvori novi'} kviz
        </Typography>
        <Box
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-between'}
        >
          <Typography variant='h6'>O Kvizu</Typography>

          <IconButton onClick={() => setShowForm((prev) => !prev)}>
            {showForm ? (
              <VisibilityOff color={quizId ? 'secondary' : 'primary'} />
            ) : (
              <Visibility color={quizId ? 'secondary' : 'primary'} />
            )}
          </IconButton>
        </Box>
        <Divider />
        {showForm && (
          <Collapse in={showForm}>
            <TextField
              sx={{ my: 1 }}
              value={quiz?.title || ''}
              label='Naslov Kviza'
              fullWidth
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            />
            <TextField
              sx={{ my: 1 }}
              value={quiz?.description || ''}
              label='Opis'
              fullWidth
              onChange={(e) =>
                setQuiz({ ...quiz, description: e.target.value })
              }
            />
            <TextField
              sx={{ my: 1 }}
              value={quiz?.thumbnail || ''}
              label='Thumbnail URL'
              fullWidth
              onChange={(e) => setQuiz({ ...quiz, thumbnail: e.target.value })}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label='Available Until'
                value={availableUntil}
                disablePast
                onChange={(newValue) => {
                  setQuiz((prevQuiz) => ({
                    ...prevQuiz,
                    availableUntil: newValue?.toISOString(),
                  }));
                }}
              />
            </LocalizationProvider>
          </Collapse>
        )}
        <Box>
          <Box
            display='flex'
            flexDirection={'row'}
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography variant='h6'>
              Pitanje {currentQuestionIndex + 1} / {quiz.questions.length}
            </Typography>
            <Box display='flex' alignItems='center'>
              <Button
                color={quizId ? 'secondary' : 'primary'}
                onClick={handleAddQuestion}
              >
                <Typography variant='h2'>+</Typography>
              </Button>
              {quiz.questions.length > 1 && (
                <Button
                  color={quizId ? 'secondary' : 'primary'}
                  onClick={() => handleRemoveQuestion(currentQuestionIndex)}
                >
                  <Typography variant='h2'>-</Typography>
                </Button>
              )}
            </Box>
          </Box>

          <Divider />
          {currentQuestion.options.length === 0 ? (
            <Box my={1}>
              <TextField
                type='number'
                label='Broj ponudenih odgovora'
                fullWidth
                onChange={(e) => setTempOptions(parseInt(e.target.value, 10))}
              />
              <Button
                variant='contained'
                color='secondary'
                sx={{ m: 1, mb: 2 }}
                onClick={() => handleSetOptionsForCurrentQuestion(tempOptions!)}
              >
                Postavi opcije
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label='Pitanje'
                  fullWidth
                  sx={{ p: 1 }}
                  value={currentQuestion.text}
                  onChange={(e) =>
                    handleQuestionChange(
                      currentQuestionIndex,
                      'text',
                      e.target.value
                    )
                  }
                />
                <TextField
                  label='URL slike kviza (neobvezni)'
                  fullWidth
                  sx={{ p: 1 }}
                  value={currentQuestion.image || ''}
                  onChange={(e) =>
                    handleQuestionChange(
                      currentQuestionIndex,
                      'image',
                      e.target.value
                    )
                  }
                />
                {currentQuestion.options.map((option, optIndex) => (
                  <Box
                    key={optIndex}
                    display='flex'
                    alignItems='center'
                    sx={{ p: 1 }}
                  >
                    <TextField
                      label={`Opcija ${optIndex + 1}`}
                      fullWidth
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...currentQuestion.options];
                        newOptions[optIndex] = e.target.value;
                        handleQuestionChange(
                          currentQuestionIndex,
                          'options',
                          newOptions
                        );
                      }}
                    />
                    <Button
                      color={quizId ? 'secondary' : 'primary'}
                      onClick={() => handleAddOption(currentQuestionIndex)}
                    >
                      <Typography variant='h2'>+</Typography>
                    </Button>
                    {currentQuestion.options.length > 1 && (
                      <Button
                        color={quizId ? 'secondary' : 'primary'}
                        onClick={() =>
                          handleRemoveOption(currentQuestionIndex, optIndex)
                        }
                      >
                        <Typography variant='h2'>-</Typography>
                      </Button>
                    )}
                  </Box>
                ))}
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl component='fieldset' fullWidth>
                  <FormLabel
                    color={quizId ? 'secondary' : 'primary'}
                    component='legend'
                    sx={{ textAlign: 'center' }}
                  >
                    <Typography mt={2} mb={1} variant='h6'>
                      Točan odgovor za ovo pitanje
                    </Typography>
                  </FormLabel>
                  <Box
                    display={{ xs: 'flex', md: 'flex' }}
                    justifyContent='center'
                  >
                    <RadioGroup
                      value={currentQuestion.correctOption}
                      onChange={(e) =>
                        handleQuestionChange(
                          currentQuestionIndex,
                          'correctOption',
                          Number(e.target.value)
                        )
                      }
                    >
                      {currentQuestion.options.map((_, optIndex) => (
                        <FormControlLabel
                          key={optIndex}
                          value={optIndex}
                          control={
                            <Radio
                              sx={{
                                '& .MuiSvgIcon-root': {
                                  fontSize: 28,
                                },
                              }}
                              color={quizId ? 'secondary' : 'primary'}
                            />
                          }
                          label={`Opcija ${optIndex + 1}`}
                        />
                      ))}
                    </RadioGroup>
                  </Box>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </Box>
        <Box display={{ xs: 'flex', md: 'block' }} justifyContent='center'>
          <Button
            variant='outlined'
            sx={{ ml: 1 }}
            disabled={currentQuestionIndex === 0}
            onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
          >
            Prethodni
          </Button>
          <Button
            variant='outlined'
            sx={{ mx: 1 }}
            disabled={currentQuestionIndex === numQuestions! - 1}
            onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
          >
            Sljedeći
          </Button>
        </Box>
      </Box>

      <Box display={{ xs: 'flex', md: 'block' }} justifyContent='center'>
        <Button
          variant='contained'
          color={quizId ? 'secondary' : 'primary'}
          sx={{ m: 1, my: 2 }}
          onClick={handleSubmit}
          disabled={!isFormValid() || isLoadingUnresolved || !hasChanges()}
        >
          {quizId ? 'Update Quiz' : 'Submit New Quiz'}
        </Button>
      </Box>
      <Snackbar
        open={submitted}
        autoHideDuration={6000}
        onClose={() => {
          setSubmitted(false);
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => {
            setSubmitted(false);
            history('/dashboard/three');
          }}
          severity='success'
        >
          Kviz uspješno {quizId ? ' azuriran' : ' kreiran'}!🎉🎉🥳 <br />{' '}
          Zatvori me za povratak na kvizove
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorSnackbar}
        autoHideDuration={6000}
        onClose={() => setErrorSnackbar(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setErrorSnackbar(null)} severity='error'>
          {errorSnackbar}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ManageQuiz;
