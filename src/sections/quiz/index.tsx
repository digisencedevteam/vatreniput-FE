import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { Answer } from './types';
import QuestionScreen from './QuestionScreen';
import StartQuizScreen from './StartQuizScreen';
import EndQuizScreen from './EndQuizScreen';
import { dummyQuiz } from 'src/lib/constants';
import { useSettingsContext } from 'src/components/settings';

const QuizApp = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const settings = useSettingsContext();


    const selectedOptions = answers.map(answer => answer.option);

    const startQuiz = () => {
        setCurrentQuestionIndex(0);
        setAnswers([]);
    };

    const handleAnswerSelection = (option: string) => {
        setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        if (selectedOption && currentQuestionIndex !== null) {
            const isCorrect = selectedOption === dummyQuiz.questions[currentQuestionIndex].correctAnswer;
            const newAnswer = {
                option: selectedOption,
                correct: isCorrect,
            };
            setAnswers(prevAnswers => [...prevAnswers, newAnswer]);
            setSelectedOption(null);

            if (currentQuestionIndex < dummyQuiz.questions.length - 1) {
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

    const handleSubmitAnswers = () => {
        if (selectedOption && currentQuestionIndex !== null) {
            const isCorrect = selectedOption === dummyQuiz.questions[currentQuestionIndex].correctAnswer;
            const newAnswer = {
                option: selectedOption,
                correct: isCorrect,
            };

            setAnswers([...answers, newAnswer]);
            setCurrentQuestionIndex(null);
        }
    };

    useEffect(() => {
        console.log(answers);
    }, [answers]);

    return (
        
        <Container
            maxWidth={settings.themeStretch ? false : 'xl'}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh'
            }}
        >
            {currentQuestionIndex === null ? (
                answers.length === dummyQuiz.questions.length ? (
                    <EndQuizScreen dummyQuiz={dummyQuiz} answers={selectedOptions} />
                ) : (
                    <StartQuizScreen dummyQuiz={dummyQuiz} startQuiz={startQuiz} />
                )
            ) : (
                <QuestionScreen
                    currentQuestion={dummyQuiz.questions[currentQuestionIndex]}
                    currentQuestionIndex={currentQuestionIndex}
                    totalQuestions={dummyQuiz.questions.length}
                    title={dummyQuiz.title}
                    selectedOption={selectedOption}
                    handleAnswerSelection={handleAnswerSelection}
                    handlePreviousQuestion={handlePreviousQuestion}
                    handleNextQuestion={handleNextQuestion}
                    handleSubmitAnswers={handleSubmitAnswers}
                />
            )}
        </Container>
    );
}

export default QuizApp;
