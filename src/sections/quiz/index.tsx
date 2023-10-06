import { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { Answer, Question, Quiz } from './types';
import QuestionScreen from './QuestionScreen';
import StartQuizScreen from './StartQuizScreen';
import EndQuizScreen from './EndQuizScreen';
import { useSettingsContext } from 'src/components/settings';
import axios, { endpoints } from 'src/utils/axios';
import { useParams } from 'react-router-dom';
import { useAuthContext } from 'src/auth/hooks';

const QuizApp = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const settings = useSettingsContext();
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const { quizId } = useParams();
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
    const currentUser = useAuthContext();

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await axios.get(endpoints.quiz.details + quizId!);
                setSelectedQuiz(response.data);
            } catch (error) {
                console.error(error);
                setSelectedQuiz(null);
            }
        };
        fetchQuizData();
    }, [quizId]);

    const getCorrectAnswer = (question: Question): string => {
        return question.options[question.correctOption];
    };

    const startQuiz = () => {
        setCurrentQuestionIndex(0);
        setAnswers([]);
        startTimer();
    };

    const startTimer = () => {
        const currentTime = Date.now();
        setStartTime(currentTime);
    };

    const stopTimer = () => {
        if (startTime) {
            const currentTime = Date.now();
            const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
            setElapsedTime(elapsedSeconds)
            return elapsedSeconds
        }
    };

    const handleAnswerSelection = (option: string) => {
        setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        if (selectedOption !== null && currentQuestionIndex !== null) {
            const currentQuestion = selectedQuiz?.questions?.[currentQuestionIndex];
            const isCorrect = currentQuestion && selectedOption === getCorrectAnswer(currentQuestion);
            const newAnswer: Answer = {
                option: selectedOption,
                correct: isCorrect || false,
            };
            setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
            setSelectedOption(null);
            if (currentQuestionIndex < selectedQuiz!.questions!.length! - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex !== null && currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setAnswers(answers.slice(0, -1));
            setSelectedOption(answers[answers.length - 1]?.option || null);
        }
    };

    const calculateScore = (): number => {
        if (selectedQuiz) {
            const totalQuestions = selectedQuiz.questions?.length;
            const correctCount = selectedQuiz.questions?.reduce((count, question, index) => {
                if (answers[index] && answers[index].correct) {
                    return count + 1;
                }
                return count;
            }, 0);

            const score = (correctCount! / totalQuestions!) * 100;
            return score;
        }
        return 0;
    };


    const handleSubmitQuiz = async () => {
        if (selectedOption !== null && currentQuestionIndex !== null) {
            if (selectedQuiz) {
                const currentQuestion = selectedQuiz!.questions![currentQuestionIndex];
                const isCorrect = selectedOption === getCorrectAnswer(currentQuestion);
                const newAnswer = {
                    option: selectedOption,
                    correct: isCorrect,
                };

                setAnswers([...answers, newAnswer]);
                setCurrentQuestionIndex(null);
                const duration = stopTimer();

                const userId = currentUser.user && currentUser.user._id;
                const quizId = selectedQuiz!._id;
                const score = calculateScore();
                try {
                    await axios.post(endpoints.quiz.details, {
                        userId,
                        quizId,
                        score,
                        duration,
                    });
                } catch (error) {
                    console.error('Error submitting quiz results:', error);
                }
            }
        }
    };

    return (
        <Container
            maxWidth={settings.themeStretch ? false : 'xl'}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
            }}
        >
            {currentQuestionIndex === null ? (
                answers.length === selectedQuiz?.questions?.length ? (
                    <EndQuizScreen
                        quiz={selectedQuiz!}
                        answers={answers}
                        elapsedTime={elapsedTime}
                        onQuizFinish={handleSubmitQuiz}

                    />
                ) : (
                    <StartQuizScreen quiz={selectedQuiz!} startQuiz={startQuiz} />
                )
            ) : (
                <QuestionScreen
                    currentQuestion={selectedQuiz!.questions![currentQuestionIndex]!}
                    currentQuestionIndex={currentQuestionIndex}
                    totalQuestions={selectedQuiz!.questions!.length!}
                    title={selectedQuiz?.title || ''}
                    selectedOption={selectedOption}
                    handleAnswerSelection={handleAnswerSelection}
                    handlePreviousQuestion={handlePreviousQuestion}
                    handleNextQuestion={handleNextQuestion}
                    handleSubmitAnswers={handleSubmitQuiz}
                    elapsedTime={elapsedTime}
                />
            )}
        </Container>
    );
};

export default QuizApp;
