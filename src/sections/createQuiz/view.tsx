import { useContext, useEffect, useState } from 'react';
import {
    Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel,
    Radio, Typography, Container, Grid, Box, Divider, Snackbar, Alert
} from '@mui/material';
import axiosInstance, { endpoints } from 'src/utils/axios';
import { useSettingsContext } from 'src/components/settings';
import { AuthContext } from 'src/auth/context/jwt';
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';

interface Question {
    text: string;
    image?: string;
    options: string[];
    correctOption: number;
}

interface Quiz {
    title: string;
    description: string;
    questions: Question[];
    thumbnail: string;
}

const CreateQuiz = () => {
    const [numQuestions, setNumQuestions] = useState<number | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quiz, setQuiz] = useState<Partial<Quiz>>({});
    const settings = useSettingsContext();
    const [tempOptions, setTempOptions] = useState<number | null>(null);
    const history = useNavigate();
    const auth = useContext(AuthContext);
    const [error, setError] = useState(false);
    const [availableUntil, setAvailableUntil] = useState<Date | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [errorSnackbar, setErrorSnackbar] = useState<string | null>(null);
    useEffect(() => {
        if (!auth.user || auth.user.email !== 'antonio@test.com') {
            history('/');
        }
    }, [auth, history]);

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

    const handleSubmit = async () => {
        const formattedDate = availableUntil?.toISOString() || "";
        const quizToSend = {
            ...quiz,
            availableUntil: formattedDate,
        };
        try {
            const response = await axiosInstance.post(endpoints.quiz.new, quizToSend);
            if ([200, 201].includes(response.status)) {
                setSubmitted(true);
            } else {
                setErrorSnackbar(`Error creating quiz: ${JSON.stringify(response.data)}`);
            }
        } catch (error) {
            setErrorSnackbar(`Error creating quiz: ${JSON.stringify(error.message)}`);
        }
    };

    const handleQuestionChange = (index: number, key: keyof Question, value: string | number | string[]) => {
        const newQuestions = [...(quiz.questions || [])];
        newQuestions[index] = { ...newQuestions[index], [key]: value };
        setQuiz({ ...quiz, questions: newQuestions });
    };



    if (!quiz.questions) {
        return (
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography variant='h3'>Koliko pitanja zelite u kvizu?</Typography>
                <TextField
                    type="number"
                    label="Broj pitanja"
                    required
                    error={error}
                    helperText={error ? 'Molimo unesite broj pitanja' : ''}
                    sx={{ width: '90%', my: 2 }}
                    onChange={(e) => setNumQuestions(parseInt(e.target.value, 10))}
                />
                <Box>
                    <Button variant='outlined' onClick={() => handleSetQuestions(numQuestions!)}>Postavi pitanja</Button>
                </Box>
            </Container>

        );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isFormValid = () => {
        return quiz.title && quiz.description && quiz.questions?.every(q => q.text && q.options.length > 0);
    };

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
            <Box>
                <Typography variant='h4'>O Kvizu</Typography>
                <Divider />
                <TextField sx={{ my: 1 }} label="Naslov Kviza" fullWidth onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} />
                <TextField sx={{ my: 1 }} label="Opis" fullWidth onChange={(e) => setQuiz({ ...quiz, description: e.target.value })} />
                <TextField sx={{ my: 1 }} label="Thumbnail URL" fullWidth onChange={(e) => setQuiz({ ...quiz, thumbnail: e.target.value })} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Available Until"
                        value={availableUntil}
                        disablePast
                        onChange={(newValue) => setAvailableUntil(newValue)}
                    />
                </LocalizationProvider>
                <Box>
                    <Typography variant='h4' m={1}>Pitanje {currentQuestionIndex + 1}</Typography>
                    <Divider />
                    {currentQuestion.options.length === 0 ? (
                        <Box my={1}>
                            <TextField type="number" label="Broj ponudenih odgovora" fullWidth onChange={(e) => setTempOptions(parseInt(e.target.value, 10))} />
                            <Button variant='contained' color='secondary' sx={{ m: 1, mb: 2 }} onClick={() => handleSetOptionsForCurrentQuestion(tempOptions!)}>Postavi opcije</Button>
                        </Box>
                    ) : (
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField label="Text pitanja" fullWidth sx={{ p: 1 }} value={currentQuestion.text}
                                    onChange={(e) => handleQuestionChange(currentQuestionIndex, 'text', e.target.value)} />
                                <TextField label="Image URL (optional)" fullWidth sx={{ p: 1 }} value={currentQuestion.image || ''}
                                    onChange={(e) => handleQuestionChange(currentQuestionIndex, 'image', e.target.value)} />
                                {currentQuestion.options.map((option, optIndex) => (
                                    <TextField key={optIndex} sx={{ p: 1 }} label={`Opcija ${optIndex + 1}`} fullWidth value={option}
                                        onChange={(e) => {
                                            const newOptions = [...currentQuestion.options];
                                            newOptions[optIndex] = e.target.value;
                                            handleQuestionChange(currentQuestionIndex, 'options', newOptions);
                                        }}
                                    />
                                ))}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl component="fieldset" fullWidth>

                                    <FormLabel component="legend" sx={{ textAlign: 'center' }}>Tocan odgovor</FormLabel>
                                    <Box display={{ xs: 'flex', md: 'flex' }} justifyContent="center">
                                        <RadioGroup value={currentQuestion.correctOption}
                                            onChange={(e) => handleQuestionChange(currentQuestionIndex, 'correctOption', Number(e.target.value))}>
                                            {currentQuestion.options.map((_, optIndex) => (
                                                <FormControlLabel key={optIndex} value={optIndex} control={<Radio />}
                                                    label={`Opcija ${optIndex + 1}`} />
                                            ))}
                                        </RadioGroup>
                                    </Box>
                                </FormControl>
                            </Grid>
                        </Grid>
                    )}
                </Box>
                <Box display={{ xs: 'flex', md: 'block' }} justifyContent="center">
                    <Button variant='outlined' sx={{ ml: 1 }} disabled={currentQuestionIndex === 0} onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}>Previous</Button>
                    <Button variant='outlined' sx={{ mx: 1 }} disabled={currentQuestionIndex === (numQuestions! - 1)} onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}>Next</Button>
                </Box>
            </Box>

            <Box display={{ xs: 'flex', md: 'block' }} justifyContent="center">
                <Button variant='contained' color='primary' sx={{ m: 1, my: 2 }} onClick={handleSubmit} disabled={!isFormValid()}>Submit new quiz</Button>
            </Box>

            <Snackbar
                open={submitted}
                autoHideDuration={6000}
                onClose={() => {
                    setSubmitted(false);

                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => { setSubmitted(false); history("/dashboard/three"); }} severity="success">
                    Kviz uspjesno kreiran!🎉🎉🥳 <br /> Zatvori me da se vratis na kvizove
                </Alert>
            </Snackbar>

            <Snackbar
                open={!!errorSnackbar}
                autoHideDuration={6000}
                onClose={() => setErrorSnackbar(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setErrorSnackbar(null)} severity="error">
                    {errorSnackbar}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default CreateQuiz;
