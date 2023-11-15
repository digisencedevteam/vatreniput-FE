import { useContext, useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Divider,
  Snackbar,
  Alert,
  IconButton,
  Collapse,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { FormikErrors, useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { paths } from 'src/routes/paths';
import dayjs from 'dayjs';
import useFetchQuizzes from 'src/hooks/use-quiz-data';
import { LoadingScreen } from 'src/components/loading-screen';
import { Question } from '../quiz/types';
import { useRouter } from 'src/routes/hooks';
import { QuizFormValues } from 'src/types';
import { AuthContext } from 'src/auth/context/jwt';
import { userRoles } from 'src/lib/constants';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Naslov je obavezan'),
  description: Yup.string().required('Opis je obavezan'),
  thumbnail: Yup.string().required('Thumbnail URL je obavezan'),
  availableUntil: Yup.string().required('Datum završetka je obavezan'),
  questions: Yup.array()
    .of(
      Yup.object().shape({
        text: Yup.string().required('Tekst pitanja je obavezan'),
        options: Yup.array()
          .min(2, 'Morate unijeti barem dvije opcije')
          .of(Yup.string().required('Tekst opcije je obavezan')),
      })
    )
    .min(1, 'Morate unijeti barem jedno pitanje'),
});

const ManageQuiz = () => {
  const { quizId } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState<string | null>(null);
  const auth = useContext(AuthContext);
  const router = useRouter();
  const {
    fetchUnresolvedQuizById,
    unresolvedQuiz,
    createOrUpdateQuiz,
    isLoadingUnresolved,
  } = useFetchQuizzes();

  const initialValues: QuizFormValues = {
    title: '',
    description: '',
    thumbnail: '',
    availableUntil: '',
    questions: [
      {
        text: '',
        options: [''],
        image: '',
        correctOption: 0,
      },
    ],
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const result = await createOrUpdateQuiz(values, quizId);
      if (result.success) {
        setSubmitted(true);
      } else {
        setErrorSnackbar(result.error || ('Naišli smo na grešku...' as string));
      }
    },
  });

  useEffect(() => {
    if (quizId) {
      fetchUnresolvedQuizById(quizId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  useEffect(() => {
    if (!auth.user || auth.user.role !== userRoles.admin) {
      router.push(`${paths.dashboard.quizzes}`);
    }
    if (unresolvedQuiz) {
      const transformedQuestions = (unresolvedQuiz.questions || []).map(
        (question) => ({
          text: question.text || '',
          options: question.options || [''],
          image: question.image || '',
          correctOption: question.correctOption || 0,
        })
      );
      formik.resetForm({
        values: {
          title: unresolvedQuiz.title || '',
          description: unresolvedQuiz.description || '',

          thumbnail: unresolvedQuiz.thumbnail || '',
          availableUntil: dayjs(unresolvedQuiz.availableUntil).format(
            'YYYY-MM-DDTHH:mm:ss'
          ),
          questions: transformedQuestions,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unresolvedQuiz]);

  const handleAddQuestion = () => {
    formik.setValues({
      ...formik.values,
      questions: [
        ...formik.values.questions,
        {
          text: '',
          options: [''],
          image: '',
          correctOption: 0,
        },
      ],
    });
  };

  const handleQuestionChange = (
    index: number,
    key: keyof Question,
    value: string | number | string[]
  ) => {
    const newQuestions = formik.values.questions.map((question, i) => {
      if (i === index) {
        return {
          ...question,
          [key]: value,
        };
      }
      return question;
    });
    formik.setFieldValue('questions', newQuestions);
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = [...formik.values.questions];
    newQuestions.splice(index, 1);
    formik.setValues({
      ...formik.values,
      questions: newQuestions,
    });
  };

  const handleAddOption = (index: number) => {
    const newQuestions = [...formik.values.questions];
    const options = newQuestions[index].options;
    options.push('');
    formik.setFieldValue('questions', newQuestions);
  };

  const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...formik.values.questions];
    const options = newQuestions[questionIndex].options;
    options.splice(optionIndex, 1);
    formik.setFieldValue('questions', newQuestions);
  };

  const isButtonDisabled =
    formik.isSubmitting || !formik.dirty || !formik.isValid;

  return (
    <Container maxWidth='xl'>
      {isLoadingUnresolved ? (
        <LoadingScreen />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <Box>
            <IconButton
              edge='start'
              color='primary'
              aria-label='back to dashboard'
              onClick={() => router.push(paths.dashboard.quizzes)}
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Typography
            variant='h4'
            textAlign='center'
            m={1}
          >
            {quizId ? 'Ažuriraj' : 'Stvori novi'} kviz
          </Typography>
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
          >
            <Typography variant='h6'>O Kvizu</Typography>
          </Box>
          <Divider />
          <Collapse in={true}>
            <TextField
              sx={{ my: 1 }}
              value={formik.values.title}
              label='Naslov Kviza'
              fullWidth
              onChange={formik.handleChange('title')}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              sx={{ my: 1 }}
              value={formik.values.description}
              label='Opis'
              fullWidth
              onChange={formik.handleChange('description')}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <TextField
              sx={{ my: 1 }}
              value={formik.values.thumbnail}
              label='Thumbnail URL'
              fullWidth
              onChange={formik.handleChange('thumbnail')}
              error={
                formik.touched.thumbnail && Boolean(formik.errors.thumbnail)
              }
              helperText={formik.touched.thumbnail && formik.errors.thumbnail}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                sx={{ my: 2 }}
                label='Datum završetka dostupnosti'
                value={dayjs(formik.values.availableUntil)}
                disablePast
                onChange={(newValue) => {
                  if (newValue) {
                    formik.setFieldValue(
                      'availableUntil',
                      newValue.format('YYYY-MM-DDTHH:mm:ss')
                    );
                  }
                }}
              />
            </LocalizationProvider>
            {formik.touched.availableUntil && formik.errors.availableUntil && (
              <Typography
                variant='caption'
                color='error'
              >
                {formik.errors.availableUntil}
              </Typography>
            )}
          </Collapse>
          {formik.values.questions.map((question, index) => (
            <Box key={index}>
              <Box
                display='flex'
                flexDirection={'row'}
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography variant='h6'>
                  Pitanje {index + 1} / {formik.values.questions.length}
                </Typography>
                <Box
                  display='flex'
                  alignItems='center'
                >
                  <Button
                    color={quizId ? 'secondary' : 'primary'}
                    onClick={handleAddQuestion}
                  >
                    <Typography variant='h2'>+</Typography>
                  </Button>
                  {formik.values.questions.length > 1 && (
                    <Button
                      color={quizId ? 'secondary' : 'primary'}
                      onClick={() => handleRemoveQuestion(index)}
                    >
                      <Typography variant='h2'>-</Typography>
                    </Button>
                  )}
                </Box>
              </Box>
              <Divider />
              <TextField
                label='Pitanje'
                fullWidth
                sx={{ p: 1 }}
                value={question.text}
                onChange={(e) =>
                  handleQuestionChange(index, 'text', e.target.value)
                }
                error={Boolean(
                  formik.touched.questions?.[index]?.text &&
                    formik.errors.questions?.[index] &&
                    typeof formik.errors.questions[index] !== 'string' &&
                    (formik.errors.questions[index] as FormikErrors<Question>)
                      .text
                )}
                helperText={
                  formik.touched.questions?.[index]?.text &&
                  formik.errors.questions?.[index] &&
                  typeof formik.errors.questions[index] !== 'string'
                    ? (formik.errors.questions[index] as FormikErrors<Question>)
                        .text
                    : ''
                }
              />
              <TextField
                label='URL slike pitanja (neobvezni)'
                fullWidth
                sx={{ p: 1 }}
                value={question.image || ''}
                onChange={(e) =>
                  handleQuestionChange(index, 'image', e.target.value)
                }
              />
              {question.options.map((option, optIndex) => (
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
                      const newOptions = [...question.options];
                      newOptions[optIndex] = e.target.value;
                      handleQuestionChange(index, 'options', newOptions);
                    }}
                    error={Boolean(
                      formik.touched.questions?.[index]?.options &&
                        formik.errors.questions?.[index] &&
                        typeof formik.errors.questions[index] !== 'string' &&
                        (
                          formik.errors.questions[
                            index
                          ] as FormikErrors<Question>
                        ).options?.[optIndex]
                    )}
                    helperText={
                      formik.touched.questions?.[index]?.options &&
                      formik.errors.questions?.[index] &&
                      typeof formik.errors.questions[index] !== 'string' &&
                      (((
                        formik.errors.questions[index] as FormikErrors<Question>
                      ).options?.[optIndex] as string) ||
                        '')
                    }
                  />
                  <Button
                    color={quizId ? 'secondary' : 'primary'}
                    onClick={() => handleAddOption(index)}
                  >
                    <Typography variant='h2'>+</Typography>
                  </Button>
                  {question.options.length > 1 && (
                    <Button
                      color={quizId ? 'secondary' : 'primary'}
                      onClick={() => handleRemoveOption(index, optIndex)}
                    >
                      <Typography variant='h2'>-</Typography>
                    </Button>
                  )}
                </Box>
              ))}

              <FormControl
                component='fieldset'
                fullWidth
              >
                <FormLabel
                  color={quizId ? 'secondary' : 'primary'}
                  component='legend'
                  sx={{ textAlign: 'center' }}
                >
                  <Typography
                    mt={2}
                    mb={1}
                    variant='h6'
                  >
                    Točan odgovor za ovo pitanje
                  </Typography>
                </FormLabel>
                <Box
                  display={{ xs: 'flex', md: 'flex' }}
                  justifyContent='center'
                >
                  <RadioGroup
                    value={question.correctOption}
                    onChange={(e) =>
                      handleQuestionChange(
                        index,
                        'correctOption',
                        Number(e.target.value)
                      )
                    }
                  >
                    {question.options.map((_, optIndex) => (
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
            </Box>
          ))}
          <Box
            display='flex'
            justifyContent='center'
          >
            <Button
              variant='outlined'
              sx={{ my: 2 }}
              onClick={handleAddQuestion}
            >
              Dodaj Pitanje
            </Button>
          </Box>
          <Button
            variant='contained'
            color={quizId ? 'secondary' : 'primary'}
            sx={{ m: 1, my: 2 }}
            type='submit'
            disabled={isButtonDisabled}
          >
            {quizId ? 'Ažuriraj Kviz' : 'Kreiraj Kviz'}
          </Button>
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
                router.push(paths.dashboard.quizzes);
              }}
              severity='success'
            >
              Kviz uspješno {quizId ? 'azuriran' : 'kreiran'}!🎉🎉🥳 <br />
              Zatvori me za povratak na kvizove
            </Alert>
          </Snackbar>
          <Snackbar
            open={!!errorSnackbar}
            autoHideDuration={6000}
            onClose={() => setErrorSnackbar(null)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert
              onClose={() => setErrorSnackbar(null)}
              severity='error'
            >
              {errorSnackbar}
            </Alert>
          </Snackbar>
        </form>
      )}
    </Container>
  );
};

export default ManageQuiz;
