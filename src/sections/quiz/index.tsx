import React, { useEffect, useRef, useState } from 'react';
import { Container } from '@mui/material';
import { Answer, Question, Quiz } from './types';
import QuestionScreen from './QuestionScreen';
import StartQuizScreen from './StartQuizScreen';
import EndQuizScreen from './EndQuizScreen';
import { useSettingsContext } from 'src/components/settings';
import axios, { endpoints } from 'src/utils/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from 'src/auth/hooks';
import { useTimerContext } from 'src/context/timer-context';

const QuizApp = () => {
    // const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    // const [answers, setAnswers] = useState<Answer[]>([]);
    const settings = useSettingsContext();
    // const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const { quizId } = useParams();
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const currentUser = useAuthContext();
    const [quizFinished, setQuizFinished] = useState(false);
    const navigate = useNavigate();
    const [hasSubmitted, setHasSubmitted] = useState(false);
    // const { timer, setTimer } = useTimerContext();
    const {
        timer, startTime, answers, currentQuestionIndex,
        startQuiz, setTimer, recordAnswer, setCurrentQuestionIndex
    } = useTimerContext();

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

    const handleAnswerSelection = (option: string) => {
        setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex !== null && selectedQuiz) {
            const currentQuestion = selectedQuiz?.questions?.[currentQuestionIndex];
            if (!currentQuestion) return;
            const isCorrect = selectedOption === getCorrectAnswer(currentQuestion);
            const newAnswer: Answer = {
                option: selectedOption,
                correct: isCorrect,
            };

            recordAnswer(newAnswer, currentQuestionIndex);

            if (currentQuestionIndex < selectedQuiz?.questions!.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                // Handle the end of the quiz (e.g., move to a completion screen, submit results, etc.)
            }
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex !== null && currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedOption(answers[currentQuestionIndex - 1]?.option || null);
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
        if (!hasSubmitted) {
            if (selectedOption !== null && currentQuestionIndex !== null && selectedQuiz) {
                const currentQuestion = selectedQuiz?.questions?.[currentQuestionIndex];
                const isCorrect = selectedOption === getCorrectAnswer(currentQuestion!);
                const newAnswer = {
                    option: selectedOption,
                    correct: isCorrect,
                };
                recordAnswer(newAnswer, currentQuestionIndex);
            }

            setCurrentQuestionIndex(null);
            const duration = 30 - timer;

            const userId = currentUser.user && currentUser.user._id;
            const quizId = selectedQuiz!._id;
            const score = calculateScore();

            try {
                await axios.post(endpoints.quiz.details, {
                    userId,
                    quizId,
                    score,
                    duration,
                    answers: answers,
                });
                console.log("Quiz submitted");
            } catch (error) {
                console.error('Error submitting quiz results:', error);
            }

            setHasSubmitted(true);
        }
    };

    useEffect(() => {
        // This effect triggers submission when timer runs out
        if (timer === 0) {
            handleSubmitQuiz();
        }
    }, [timer]);

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