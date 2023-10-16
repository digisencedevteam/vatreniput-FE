import React, { createContext, useContext, useEffect, useState } from 'react';
import { Answer, Quiz } from 'src/sections/quiz/types';

interface TimerContextType {
    timer: number;
    startTime: number | null;
    answers: Answer[];
    currentQuestionIndex: number | null;
    startQuiz: () => void;
    setTimer: (value: number) => void;
    recordAnswer: (answer: Answer, index: number) => void;
    setCurrentQuestionIndex: (index: number | null) => void;
    resetTimer: () => void
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const useTimerContext = (): TimerContextType => {
    const context = useContext(TimerContext);
    if (!context) {
        throw new Error('useTimerContext must be used within a TimerProvider');
    }
    return context;
};

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
    const [timer, setTimer] = useState<number>(30);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null);
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);


    useEffect(() => {
        const storedStartTime = localStorage.getItem('startTime');
        const quizInProgress = localStorage.getItem('quizInProgress') === 'true';
        if (storedStartTime && quizInProgress) {
            const now = Date.now();
            const elapsedSeconds = Math.floor((now - Number(storedStartTime)) / 1000);
            if (elapsedSeconds >= 30) {
                setTimer(0);
            } else {
                setTimer(30 - elapsedSeconds);
            }
            setCurrentQuestionIndex(0);
        }
    }, []);

    useEffect(() => {
        const storedSelectedQuiz = localStorage.getItem('selectedQuiz');
        if (storedSelectedQuiz) {
            setSelectedQuiz(JSON.parse(storedSelectedQuiz));
        }
    }, []);

    useEffect(() => {
        if (selectedQuiz) {
            localStorage.setItem('selectedQuiz', JSON.stringify(selectedQuiz));
        }
    }, [selectedQuiz]);

    const startQuiz = () => {
        const currentStartTime = Date.now();
        setStartTime(currentStartTime);
        localStorage.setItem('startTime', String(currentStartTime));
        localStorage.setItem('quizInProgress', 'true');
        setTimer(30);
        setCurrentQuestionIndex(0);
        setAnswers([]);
    };

    useEffect(() => {
        if (timer === 0) {
            localStorage.setItem('quizInProgress', 'false');
            localStorage.removeItem('startTime');
        }
    }, [timer]);

    const recordAnswer = (answer: Answer, index: number) => {
        setAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            newAnswers[index] = answer;
            return newAnswers;
        });
    };

    const resetTimer = () => {
        setTimer(30);
    };

    useEffect(() => {
        if (currentQuestionIndex !== null) {
            const timerInterval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer === 0) {
                        localStorage.removeItem('startTime');
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);

            return () => {
                clearInterval(timerInterval);
            };
        }
    }, [currentQuestionIndex]);

    return (
        <TimerContext.Provider
            value={{
                timer, startTime, answers, currentQuestionIndex,
                startQuiz, setTimer, recordAnswer, setCurrentQuestionIndex, resetTimer
            }} >
            {children}
        </TimerContext.Provider>
    );
};
